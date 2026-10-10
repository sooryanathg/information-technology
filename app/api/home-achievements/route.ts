
import { NextRequest, NextResponse } from "next/server";
import { drive } from "@/lib/googleDrive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FOLDER_MIME = "application/vnd.google-apps.folder";

type DriveFile = {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  createdTime?: string | null;
  parents?: string[] | null;
};

async function listFiles(query: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: query,
      fields: "nextPageToken,files(id,name,mimeType,createdTime,parents)",
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    files.push(...((response.data.files ?? []) as DriveFile[]));
    pageToken = response.data.nextPageToken ?? undefined;
  } while (pageToken);

  return files;
}

async function getAchievementFolderIds(parentId: string): Promise<string[]> {
  // Walk the full folder tree. Achievement images may be nested several
  // levels below the configured root folder.
  const folderIds = new Set<string>([parentId]);
  const pendingFolderIds = [parentId];

  while (pendingFolderIds.length > 0) {
    const currentFolderId = pendingFolderIds.shift()!;
    const children = await listFiles(
      `'${currentFolderId}' in parents and trashed = false`
    );

    for (const child of children) {
      if (child.id && child.mimeType === FOLDER_MIME && !folderIds.has(child.id)) {
        folderIds.add(child.id);
        pendingFolderIds.push(child.id);
      }
    }
  }

  return [...folderIds];
}

export async function GET(request: NextRequest) {
  try {
    const parentId = process.env.GOOGLE_DRIVE_ACHIEVEMENTS_FOLDER_ID;

    if (!parentId) {
      return NextResponse.json(
        { error: "Missing parent folder ID in .env.local" },
        { status: 500 }
      );
    }

    const imageId = request.nextUrl.searchParams.get("id");
    const folderIds = await getAchievementFolderIds(parentId);

    // Fetch files from every folder beneath the configured root.
    const imageLists = await Promise.all(
      folderIds.map((folderId) =>
        listFiles(`'${folderId}' in parents and trashed = false`)
      )
    );

    const discoveredImages = imageLists
      .flat()
      .filter(
        (file) =>
          file.id &&
          file.name &&
          file.mimeType?.startsWith("image/")
      );
    const allowedImageIds = new Set(
      discoveredImages.map((file) => file.id as string)
    );

    // Return an individual image.
    // Example: /api/home-achievements?id=GOOGLE_DRIVE_IMAGE_ID
    if (imageId) {
      const metadata = await drive.files.get({
        fileId: imageId,
        fields: "id,name,mimeType,parents",
        supportsAllDrives: true,
      });

      const file = metadata.data;
      const belongsToAchievementFolder =
        allowedImageIds.has(imageId) ||
        (file.parents ?? []).some((folderId) => folderIds.includes(folderId));

      if (!file.mimeType?.startsWith("image/") || !belongsToAchievementFolder) {
        console.log("Image validation failed:", {
          imageId,
          mimeType: file.mimeType,
          parents: file.parents,
          allowedFolderIds: folderIds,
          allowedImageIds: [...allowedImageIds].slice(0, 10),
        });

        return NextResponse.json(
          {
            error: "Image validation failed",
            mimeType: file.mimeType,
            parents: file.parents,
            allowedFolderIds: folderIds,
          },
          { status: 404 }
        );
      }

      const result = await drive.files.get(
        { fileId: imageId, alt: "media", supportsAllDrives: true },
        { responseType: "arraybuffer" }
      );

      return new NextResponse(Buffer.from(result.data as ArrayBuffer), {
        headers: {
          "Content-Type": file.mimeType,
          "Cache-Control": "private, max-age=300",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // Sort newest first and keep only six images from anywhere in the tree.
    const images = discoveredImages
      .sort(
        (a, b) =>
          new Date(b.createdTime ?? 0).getTime() -
          new Date(a.createdTime ?? 0).getTime()
      )
      .slice(0, 6)
      .map((file) => ({
        id: file.id!,
        name: file.name!,
        createdTime: file.createdTime ?? null,
        imageUrl: `/api/home-achievements?id=${encodeURIComponent(file.id!)}`,
      }));

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Home achievements API error:", error);

    return NextResponse.json(
      { error: "Could not fetch Google Drive achievements" },
      { status: 500 }
    );
  }
}

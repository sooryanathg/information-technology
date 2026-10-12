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

async function getGalleryFolderIds(parentId: string): Promise<string[]> {
  // Walk the full folder tree. Gallery images may be nested several
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

// Filename convention: "<row number>-<big|small>-<label with dashes>.<ext>"
// e.g. "1-big-farewell-26.jpg" -> row 1, big card, label "Farewell 26"
// Files that don't match still show up, grouped into one row after the
// named ones, labeled from the filename as-is.
function parseGalleryFilename(filename: string): {
  row: number;
  size: "big" | "small";
  label: string;
} {
  const match = filename.match(/^(\d+)-(big|small)-(.+)\.[^.]+$/i);

  if (match) {
    const [, rowStr, size, rest] = match;
    return {
      row: Number(rowStr),
      size: size.toLowerCase() as "big" | "small",
      label: filenamePartToLabel(rest),
    };
  }

  return {
    row: 9999,
    size: "small",
    label: filenamePartToLabel(filename.replace(/\.[^/.]+$/, "")),
  };
}

function filenamePartToLabel(part: string): string {
  return part
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const parentId = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;

    if (!parentId) {
      return NextResponse.json(
        { error: "Missing GOOGLE_DRIVE_GALLERY_FOLDER_ID in .env.local" },
        { status: 500 }
      );
    }

    const imageId = request.nextUrl.searchParams.get("id");
    const folderIds = await getGalleryFolderIds(parentId);

    const imageLists = await Promise.all(
      folderIds.map((folderId) =>
        listFiles(`'${folderId}' in parents and trashed = false`)
      )
    );

    const discoveredImages = imageLists
      .flat()
      .filter(
        (file) => file.id && file.name && file.mimeType?.startsWith("image/")
      );
    const allowedImageIds = new Set(
      discoveredImages.map((file) => file.id as string)
    );

    // Return an individual image.
    // Example: /api/gallery?id=GOOGLE_DRIVE_IMAGE_ID
    if (imageId) {
      const metadata = await drive.files.get({
        fileId: imageId,
        fields: "id,name,mimeType,parents",
        supportsAllDrives: true,
      });

      const file = metadata.data;
      const belongsToGalleryFolder =
        allowedImageIds.has(imageId) ||
        (file.parents ?? []).some((folderId) => folderIds.includes(folderId));

      if (!file.mimeType?.startsWith("image/") || !belongsToGalleryFolder) {
        return NextResponse.json(
          { error: "Image validation failed" },
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

    // Return the full list, grouped by row via the filename, newest first
    // within each row.
    const images = discoveredImages
      .map((file) => {
        const parsed = parseGalleryFilename(file.name!);
        return {
          id: file.id!,
          name: file.name!,
          createdTime: file.createdTime ?? null,
          row: parsed.row,
          size: parsed.size,
          label: parsed.label,
          imageUrl: `/api/gallery?id=${encodeURIComponent(file.id!)}`,
        };
      })
      .sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row;
        return (
          new Date(b.createdTime ?? 0).getTime() -
          new Date(a.createdTime ?? 0).getTime()
        );
      });

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Gallery API error:", error);

    return NextResponse.json(
      { error: "Could not fetch Google Drive gallery images" },
      { status: 500 }
    );
  }
}
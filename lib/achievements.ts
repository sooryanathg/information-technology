import { drive } from "@/lib/googleDrive";

const FOLDER_MIME = "application/vnd.google-apps.folder";

// How long the list of achievement images is reused before Drive is asked
// again. New uploads show up on the home page within this time.
const LIST_TTL_MS = 5 * 60_000;
const FRESH_MIN_MS = 30_000;

type DriveFile = {
  id?: string | null;
  name?: string | null;
  mimeType?: string | null;
  createdTime?: string | null;
};

export type AchievementFile = {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string | null;
};

async function listFiles(query: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const response = await drive.files.list({
      q: query,
      fields: "nextPageToken,files(id,name,mimeType,createdTime)",
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

// Walk the full folder tree, collecting images on the way. Achievement images
// may be nested several levels below the configured root folder.
async function fetchAchievementImages(rootId: string): Promise<AchievementFile[]> {
  const seen = new Set<string>([rootId]);
  let level = [rootId];
  const images: AchievementFile[] = [];

  while (level.length > 0) {
    const children = (
      await Promise.all(
        level.map((folderId) => listFiles(`'${folderId}' in parents and trashed = false`))
      )
    ).flat();

    level = [];
    for (const child of children) {
      if (!child.id) continue;
      if (child.mimeType === FOLDER_MIME) {
        if (!seen.has(child.id)) {
          seen.add(child.id);
          level.push(child.id);
        }
      } else if (child.name && child.mimeType?.startsWith("image/")) {
        images.push({
          id: child.id,
          name: child.name,
          mimeType: child.mimeType,
          createdTime: child.createdTime ?? null,
        });
      }
    }
  }

  // Newest first.
  return images.sort(
    (a, b) =>
      new Date(b.createdTime ?? 0).getTime() - new Date(a.createdTime ?? 0).getTime()
  );
}

let cached: { at: number; images: Promise<AchievementFile[]> } | null = null;

/**
 * Every image under the achievements folder, newest first, reused for
 * LIST_TTL_MS. `fresh` asks Drive again sooner, at most every FRESH_MIN_MS.
 */
export function getAchievementImages(fresh = false): Promise<AchievementFile[]> {
  const rootId = process.env.GOOGLE_DRIVE_ACHIEVEMENTS_FOLDER_ID;
  if (!rootId) {
    return Promise.reject(new Error("Missing GOOGLE_DRIVE_ACHIEVEMENTS_FOLDER_ID"));
  }

  const age = cached ? Date.now() - cached.at : Infinity;
  // A forced refresh still waits FRESH_MIN_MS, so requests for made-up IDs
  // can't keep sending the whole folder walk to Drive.
  if (cached && age <= LIST_TTL_MS && !(fresh && age > FRESH_MIN_MS)) {
    return cached.images;
  }

  const images = fetchAchievementImages(rootId);
  cached = { at: Date.now(), images };
  // Don't keep a failed lookup around; the next request tries again.
  images.catch(() => {
    if (cached?.images === images) cached = null;
  });
  return images;
}

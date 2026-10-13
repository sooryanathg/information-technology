import { NextResponse } from "next/server";
import { drive } from "@/lib/googleDrive";
import { getAchievementImages } from "@/lib/achievements";

export const runtime = "nodejs";

// A file's content rarely changes under the same Drive ID, so let browsers,
// Vercel's CDN and the image optimizer keep it for a day.
const CACHE_CONTROL = "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800";

// One achievement image, e.g. /api/home-achievements/GOOGLE_DRIVE_IMAGE_ID.
// Only images under the achievements folder are served.
export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/home-achievements/[id]">
) {
  const { id } = await ctx.params;

  try {
    let file = (await getAchievementImages()).find((image) => image.id === id);
    // It may have been uploaded since the list was last read.
    file ??= (await getAchievementImages(true)).find((image) => image.id === id);

    if (!file) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const result = await drive.files.get(
      { fileId: id, alt: "media", supportsAllDrives: true },
      { responseType: "arraybuffer" }
    );

    return new NextResponse(Buffer.from(result.data as ArrayBuffer), {
      headers: {
        "Content-Type": file.mimeType,
        "Cache-Control": CACHE_CONTROL,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Home achievements image error:", error);

    return NextResponse.json(
      { error: "Could not fetch Google Drive image" },
      { status: 500 }
    );
  }
}

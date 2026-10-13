import { NextResponse } from "next/server";
import { getAchievementImages } from "@/lib/achievements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The latest six achievement images. Each image itself is served by
// /api/home-achievements/[id].
export async function GET() {
  try {
    const images = (await getAchievementImages()).slice(0, 6).map((file) => ({
      id: file.id,
      name: file.name,
      createdTime: file.createdTime,
      imageUrl: `/api/home-achievements/${encodeURIComponent(file.id)}`,
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

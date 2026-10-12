import { google } from "googleapis";
import { NextResponse } from "next/server";
import type { ProjectBatch } from "@/types/research";

export const runtime = "nodejs";

// One row per project: Batch | Type | Project Title | Members | Guide.
// Register numbers are deliberately not stored; only names are shown on the site.
const RANGE = "'project_archive'!A:E";

const clean = (value?: string) => (value ?? "").trim();

// "2021–25" / "2021-25" -> 2021, so batches sort newest first.
const startYear = (batch: string) => Number(batch.match(/\d{4}/)?.[0] ?? 0);

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_PLACEMENT_SHEET_ID,
      range: RANGE,
    });

    const [header = [], ...rows] = response.data.values ?? [];

    // Look columns up by header name so reordering columns in the sheet is safe.
    const col = (name: string) =>
      header.findIndex((h: string) => h.trim().toLowerCase() === name);
    const idx = {
      batch: col("batch"),
      kind: col("type"),
      title: col("project title"),
      members: col("members"),
      guide: col("guide"),
    };
    const cell = (row: string[], i: number) => (i < 0 ? "" : clean(row[i]));

    const batches = new Map<string, ProjectBatch>();
    for (const row of rows) {
      const batch = cell(row, idx.batch).replace(/\s*-\s*/, "–");
      const title = cell(row, idx.title);
      if (!batch || !title) continue;

      const kind = cell(row, idx.kind);
      const key = `${batch}|${kind}`;
      if (!batches.has(key)) batches.set(key, { batch, kind, projects: [] });
      batches.get(key)!.projects.push({
        title,
        members: cell(row, idx.members).split(",").map((m) => m.trim()).filter(Boolean),
        guide: cell(row, idx.guide),
      });
    }

    const result = [...batches.values()].sort(
      (a, b) => startYear(b.batch) - startYear(a.batch)
    );

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Project archive sheet error:", error);

    return NextResponse.json(
      { error: "Failed to fetch project archive" },
      { status: 500 }
    );
  }
}

import { google } from "googleapis";
import { NextResponse } from "next/server";
import type { AcademicProject } from "@/types/research";

export const runtime = "nodejs";

// "research" tab of the placement sheet. Rows are added by hand after reviewing
// the project submission form's responses.
const RANGE = "'research'!A:E";

const EMPTY = /^(na|n\/a|-|none|not provided|not specified)\.?$/i;
const clean = (value?: string) => {
  const v = (value ?? "").trim();
  return EMPTY.test(v) ? "" : v;
};

// Cells hold labelled lines, e.g. "Team: A, B\nFaculty mentor: Dr. X".
// Returns the value after the first matching label, plus the unlabelled lines.
const splitLabels = (cell = "") => {
  const labelled: Record<string, string> = {};
  const rest: string[] = [];
  for (const line of cell.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const m = line.match(/^([^:]{2,40}):\s*(.*)$/);
    if (m && !/^https?$/i.test(m[1])) labelled[m[1].trim().toLowerCase()] = m[2];
    else rest.push(line);
  }
  const pick = (...labels: string[]) =>
    clean(labels.map((l) => labelled[l]).find((v) => v !== undefined));
  return { pick, rest };
};

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

    // Look columns up by the start of the header so reordering columns is safe.
    const col = (prefix: string) =>
      header.findIndex((h: string) => h.trim().toLowerCase().startsWith(prefix));
    const idx = {
      title: col("project title"),
      overview: col("problem statement"),
      domain: col("domain"),
      stage: col("project stage"),
      potential: col("research"),
    };
    const cell = (row: string[], i: number) => (i < 0 ? "" : (row[i] ?? ""));

    const projects: AcademicProject[] = rows
      .map((row, i) => {
        const title = splitLabels(cell(row, idx.title));
        const domain = splitLabels(cell(row, idx.domain));
        const stageCell = cell(row, idx.stage);
        const stage = splitLabels(stageCell);

        return {
          id: `project-${i + 2}`, // sheet row number
          title: clean(title.rest[0]),
          team: title.pick("team", "team members", "members"),
          mentor: title.pick("faculty mentor", "mentor", "guide"),
          overview: clean(cell(row, idx.overview)),
          domain: domain.pick("domain") || clean(domain.rest.join(" ")),
          stack: domain.pick("tech stack", "stack", "tech", "tools"),
          stage: stage.pick("stage", "project stage"),
          links: stageCell.match(/https?:\/\/[^\s,)]+/g) ?? [],
          potential: clean(cell(row, idx.potential)),
        };
      })
      .filter((p) => p.title);

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Research sheet error:", error);

    return NextResponse.json(
      { error: "Failed to fetch academic projects" },
      { status: 500 }
    );
  }
}

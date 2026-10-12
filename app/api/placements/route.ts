import { google } from "googleapis";
import { NextResponse } from "next/server";
import type { PlacementNotice } from "@/types/placement";

export const runtime = "nodejs";

// Sheet tab holding the internship / placement notices.
const RANGE = "'placement_notif.csv'!A:H";

const EMPTY = new Set(["", "na", "n/a", "not specified", "-"]);
const clean = (value?: string) =>
  EMPTY.has((value ?? "").trim().toLowerCase()) ? "" : (value ?? "").trim();

// Today's date in India, as YYYY-MM-DD, so deadlines expire at local midnight.
const todayInIndia = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

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
      company: col("company"),
      role: col("role / event"),
      eligibility: col("eligibility"),
      ctc: col("ctc / benefits"),
      deadline: col("registration deadline"),
      link: col("link"),
      status: col("status"),
      details: Math.max(col("details for developer"), col("details")),
    };
    const cell = (row: string[], i: number) => (i < 0 ? "" : clean(row[i]));

    const today = todayInIndia();

    const notices: PlacementNotice[] = rows
      .map((row, i) => {
        const deadline = cell(row, idx.deadline);
        const link = cell(row, idx.link);
        const isUrl = /^https?:\/\//i.test(link);

        return {
          id: `notice-${i + 2}`, // sheet row number
          company: cell(row, idx.company),
          role: cell(row, idx.role),
          eligibility: cell(row, idx.eligibility),
          ctc: cell(row, idx.ctc),
          deadline: /^\d{4}-\d{2}-\d{2}$/.test(deadline) ? deadline : null,
          applyLink: isUrl ? link : null,
          linkNote: isUrl ? "" : link,
          status: cell(row, idx.status),
          details: cell(row, idx.details),
        };
      })
      .filter(
        (n) =>
          (n.company || n.role) &&
          !/closed|inactive|expired/i.test(n.status) &&
          (!n.deadline || n.deadline >= today)
      );

    return NextResponse.json(notices, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Placement sheet error:", error);

    return NextResponse.json(
      { error: "Failed to fetch placement notices" },
      { status: 500 }
    );
  }
}

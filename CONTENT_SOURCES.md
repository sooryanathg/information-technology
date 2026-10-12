# Content sources

Where the site's live content comes from, and where to go to update it.

Some sections read Google Sheets and Google Drive at request time, so editing the sheet
or folder updates the site without a code change. Others are still links typed into
the code and need a commit and redeploy. Merging everything into one spreadsheet and one
Drive folder is planned; see [Planned cleanup](#planned-cleanup).

## Access

Every Sheet and Drive folder below is read by one Google service account:

```
it-notifications-reader@it-department-notifications.iam.gserviceaccount.com
```

Share each Sheet or folder with this address (Viewer is enough for the site to read
it). If a section shows "Could not load…", check this first.

The credentials live in `.env.local` (never committed):

| Variable                              | What it is                    |
| ------------------------------------- | ----------------------------- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`        | The service account above     |
| `GOOGLE_PRIVATE_KEY`                  | Its private key               |
| `GOOGLE_SHEET_ID`                     | Notifications spreadsheet     |
| `GOOGLE_PLACEMENT_SHEET_ID`           | `placement_notif` spreadsheet |
| `GOOGLE_DRIVE_ACHIEVEMENTS_FOLDER_ID` | Achievements Drive folder     |

The downloaded service account key (`it-department-notifications-*.json`) must never
be committed. It is listed in `.gitignore`.

## Google Sheets (live)

### 1. IT Department Notifications

[Open spreadsheet](https://docs.google.com/spreadsheets/d/1f8DxU2UrQ7kqHQsvOSOwYx5GSOiMe-ji1chFdtlm8J8/edit)
· env `GOOGLE_SHEET_ID`

| Tab             | Shown on                         | Columns (row 1 is the header) |
| --------------- | -------------------------------- | ----------------------------- |
| `Notifications` | Home page, notifications section | A Title · B Category · C Date |

Read by `app/api/notifications/route.ts`. Columns are read by position, so keep the
order A–C. Changes show up on the next page load.

### 2. placement_notif

[Open spreadsheet](https://docs.google.com/spreadsheets/d/1VO8vC4HueszvQyaMJrt0fi_ImbjEM5R1Os5_vgwIl3w/edit)
· env `GOOGLE_PLACEMENT_SHEET_ID`

| Tab                                                                                                                              | Shown on                                  | Read by                            |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------- |
| [`placement_notif.csv`](https://docs.google.com/spreadsheets/d/1VO8vC4HueszvQyaMJrt0fi_ImbjEM5R1Os5_vgwIl3w/edit#gid=1565757087) | Placement page, notice board              | `app/api/placements/route.ts`      |
| [`research`](https://docs.google.com/spreadsheets/d/1VO8vC4HueszvQyaMJrt0fi_ImbjEM5R1Os5_vgwIl3w/edit#gid=192598726)             | Research page, Student Academic Projects  | `app/api/research/route.ts`        |
| [`project_archive`](https://docs.google.com/spreadsheets/d/1VO8vC4HueszvQyaMJrt0fi_ImbjEM5R1Os5_vgwIl3w/edit#gid=330873339)      | Research page, Final Year & Mini Projects | `app/api/project-archive/route.ts` |

Columns in these tabs are found by header name, so they can be reordered, but the
header text must stay the same. Changes show up within about 5 minutes (responses are
cached).

**`placement_notif.csv`**: `Company`, `Role / Event`, `Eligibility`, `CTC / Benefits`,
`Registration Deadline` (YYYY-MM-DD), `Link`, `Status`, `Details`.
Rows are hidden once the deadline has passed or `Status` contains "closed",
"inactive" or "expired". `NA` or empty cells are treated as blank.

**`research`**: `Project Title & Team`, `Problem Statement & Overview`,
`Domain & Tech Stack`, `Project Stage & Links`, `Research & Opportunity Potential`.
Cells use labelled lines:

```
Project Title & Team:    <title on the first line>
                         Team: A, B, C
                         Faculty mentor: Dr. X
Domain & Tech Stack:     Domain: AI / Healthcare        (split on "/" into tags)
                         Tech stack: Python, Flutter
Project Stage & Links:   Stage: Prototype
                         GitHub: https://...            (any URL becomes a link button)
```

Rows are added by hand after reviewing responses to the project submission form.

**`project_archive`**: `Batch` (e.g. `2024-28`), `Type` (`Final Year Project` or
`Mini Project`), `Project Title`, `Members` (comma-separated), `Guide`.
One row per project. Each batch gets its own filter button, newest first. Don't add
register numbers; only names are shown.

## Google Forms

| Form                         | Used on                              | Set in                   |
| ---------------------------- | ------------------------------------ | ------------------------ |
| Project submission (pending) | Research page, "Submit your project" | `data/research/links.ts` |

Responses are collected only, never published directly. Until the URL is set, the
button reads "Project submission form opening soon".

## Google Drive

### Live folder

| Folder                                                                                   | Shown on                | Read by                              |
| ---------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------ |
| [Achievements](https://drive.google.com/drive/folders/1TGlG1b1mewSU7k9eRIgJIMiikWZokukX) | Home page, achievements | `app/api/home-achievements/route.ts` |

Images anywhere inside this folder, including subfolders, are picked up
automatically. Env `GOOGLE_DRIVE_ACHIEVEMENTS_FOLDER_ID`.

### Links in code (need a commit to change)

| What                          | File                                             | Links                                              |
| ----------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| Previous year question papers | `components/pages/home/Resources/PyqLinks.tsx`   | One Drive folder per scheme year and semester (14) |
| Notes                         | `components/pages/home/Resources/NotesLinks.tsx` | One Drive folder per scheme year and semester (14) |
| Event photos                  | `components/pages/events/data/dataset.ts`        | Drive file IDs passed to `driveImg()` (~42)        |

Drive files and folders linked here must be shared as "Anyone with the link can
view", or visitors will see an access prompt.

## Not from Google

Events and other page text not listed above live in the repo. See "Where to change things" in [README.md](README.md).

## Planned cleanup

- Merge the two spreadsheets into one "website data" spreadsheet, so there is a single
  `GOOGLE_SHEET_ID`.
- Move PYQ and notes links into a `resources` tab, and events into an `events` tab, so
  they can be updated without a code change.
- Keep all Drive content under one website folder (`achievements/`, `events/`, `pyq/`,
  `notes/`).
- Have a department-owned Google account own the spreadsheet and folder instead of a
  personal account.

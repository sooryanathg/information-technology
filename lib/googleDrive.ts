import { google } from "googleapis";

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!email || !privateKey) {
  throw new Error("Missing Google Drive credentials in .env.local");
}

const auth = new google.auth.JWT({
  email,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export const drive = google.drive({
  version: "v3",
  auth,
});
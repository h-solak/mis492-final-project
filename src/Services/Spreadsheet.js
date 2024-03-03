import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../config/mis492-28281658a520.json";

const getDoc = async () => {
  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
  });

  const doc = new GoogleSpreadsheet(
    "188m0fZYdeoLnCr3c_-u1OLHTTsu8g4QV_hrQsPNpqGw",
    jwt
  );
  return doc;
};

export { getDoc };

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '', jwt);

export async function getWishes() {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Assuming the first sheet
    const rows = await sheet.getRows();
    
    return rows.map(row => ({
      id: row.get('id'),
      name: row.get('name'),
      attendance: row.get('attendance'),
      message: row.get('message'),
      createdAt: row.get('createdAt'),
    }));
  } catch (error) {
    console.error('Error fetching rows from Google Sheets:', error);
    throw error;
  }
}

export async function addWish(wish: { name: string; attendance: string; message: string; id: string; createdAt: string }) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Load rows to check for headers
    await sheet.loadHeaderRow().catch(() => {
      // If loadHeaderRow fails, it means no headers are set
      return null;
    });

    // If headers are missing or not what we expect, set them
    if (sheet.headerValues.length === 0 || sheet.headerValues[0] !== 'id') {
      await sheet.clear();
      await sheet.setHeaderRow(['id', 'name', 'attendance', 'message', 'createdAt']);
    }

    await sheet.addRow(wish);
    return wish;
  } catch (error) {
    console.error('Error adding row to Google Sheets:', error);
    throw error;
  }
}

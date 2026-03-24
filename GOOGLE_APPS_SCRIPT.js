// COPY DAN PASTE KODE INI KE GOOGLE APPS SCRIPT
// 1. Buka Spreadsheet Anda.
// 2. Klik menu 'Extensions' > 'Apps Script'.
// 3. Hapus kode yang ada, lalu tempel kode di bawah ini.
// 4. Klik 'Deploy' > 'New Deployment'.
// 5. Pilih type 'Web App'.
// 6. Ubah 'Who has access' menjadi 'Anyone'.
// 7. Klik 'Deploy' dan salin URL Web App yang muncul.
// 8. Tempel URL tersebut ke file .env.local pada variabel NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL.

const SPREADSHEET_ID = '1Uh-TLiJMz_60fl3icHF3W-Ozw_NJcqNu4XO1ApUXsi0';

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const data = [];
    
    for (let i = 1; i < rows.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = rows[i][j];
      }
      data.push(obj);
    }
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    const params = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      params.id,
      params.name,
      params.attendance,
      params.message,
      params.createdAt
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

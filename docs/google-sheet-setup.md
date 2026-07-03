# Capture enquiries & clicks in a Google Sheet (no backend)

The site can log every enquiry-form submission and WhatsApp click straight
into a Google Sheet using a free **Google Apps Script Web App**.

## 1. Create the Sheet
Make a new Google Sheet. Note its tab name (default `Sheet1`).

## 2. Add the Apps Script
In the Sheet: **Extensions → Apps Script**, delete anything there, paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) {}

  // Create header row once
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Type', 'Student', 'Age', 'Parent',
      'Phone', 'Email', 'Level', 'Branch', 'Message', 'Source', 'Page'
    ]);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.type || '',
    data.studentName || '',
    data.age || '',
    data.parentName || '',
    data.phone || '',
    data.email || '',
    data.level || '',
    data.branch || '',
    data.message || '',
    data.source || '',
    data.page || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy
**Deploy → New deployment → ⚙️ → Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Click **Deploy**, authorize, and **copy the Web app URL** (ends in `/exec`).

## 4. Paste the URL into the site
Open `src/lib/sheets.ts` and set:

```ts
export const SHEETS_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec'
```

Rebuild/redeploy. Done — enquiries and WhatsApp clicks now append to the Sheet
in real time.

### Notes
- Requests are fire-and-forget (`mode: 'no-cors'`), so they never slow down or
  block the user, and never error out on the page.
- Because of `no-cors`, the browser can't read the response — that's fine, the
  row is still written.
- To also capture calls / other buttons, call `logToSheet({ type: 'call_click', source: '...' })`
  from that button's `onClick`.

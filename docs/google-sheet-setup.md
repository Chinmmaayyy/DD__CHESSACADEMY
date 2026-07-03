# Capture enquiries & clicks in a Google Sheet (no backend)

The site can log every enquiry-form submission and WhatsApp click straight
into a Google Sheet using a free **Google Apps Script Web App**.

## 1. Create the Sheet
Make a new Google Sheet. Note its tab name (default `Sheet1`).

## 2. Add the Apps Script
In the Sheet: **Extensions → Apps Script**, delete anything there, paste:

```javascript
// ⚙️ CONFIG — Sheet ID (the long code in your Sheet's URL) + notify email:
var SHEET_ID = '1iA0BIkEnOf9uU5DyoiqPb3r2lzgrDREPBaBhik0XWEM';
var SHEET_TAB = 'Sheet1';
var NOTIFY_EMAIL = 'dhuridipak2@gmail.com';

// Opening the /exec URL in a browser shows this — confirms the app is live.
function doGet() {
  return ContentService
    .createTextOutput('👍 DD Chess Academy Logging Web App is running successfully!')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // openById works whether the script is bound to the Sheet or standalone.
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_TAB) || ss.getSheets()[0];

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
      data.type || '', data.studentName || '', data.age || '',
      data.parentName || '', data.phone || '', data.email || '',
      data.level || '', data.branch || '', data.message || '',
      data.source || '', data.page || ''
    ]);

    // Also email real enquiry submissions (skip WhatsApp / click logs).
    var isEnquiry = String(data.type || '').toLowerCase().indexOf('enquiry') !== -1 || !!data.phone;
    if (isEnquiry) {
      var body =
        'New enquiry from the DD Chess Academy website:\n\n' +
        'Student:          ' + (data.studentName || '-') + '\n' +
        'Age:              ' + (data.age || '-') + '\n' +
        'Parent/Guardian:  ' + (data.parentName || '-') + '\n' +
        'Phone:            ' + (data.phone || '-') + '\n' +
        'Email:            ' + (data.email || '-') + '\n' +
        'Level:            ' + (data.level || '-') + '\n' +
        'Preferred centre: ' + (data.branch || '-') + '\n' +
        'Message:          ' + (data.message || '-') + '\n\n' +
        'Received: ' + (data.timestamp || new Date().toISOString());
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New enquiry — DD Chess Academy',
        replyTo: data.email || NOTIFY_EMAIL,
        body: body
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

> **Important — after pasting, you must RE-DEPLOY the new version:**
> **Deploy → Manage deployments → ✏️ (edit) → Version: _New version_ → Deploy.**
> Editing the code alone does **not** update the live `/exec` URL.
> It will also ask permission to **send email as you** (Gmail) — approve it.
> Every enquiry then lands in both the Sheet **and** your inbox; WhatsApp/click
> logs are not emailed.

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

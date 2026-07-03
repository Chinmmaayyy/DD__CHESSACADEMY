# Capture enquiries & clicks in a Google Sheet (no backend)

The site can log every enquiry-form submission and WhatsApp click straight
into a Google Sheet using a free **Google Apps Script Web App**.

## 1. Create the Sheet
Make a new Google Sheet. Note its tab name (default `Sheet1`).

## 2. Add the Apps Script
In the Sheet: **Extensions → Apps Script**, delete anything there, paste:

```javascript
// ⚙️ Address that should receive an email for every enquiry:
var NOTIFY_EMAIL = 'dhuridipak2@gmail.com';

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

  // Also email real enquiry submissions (skip WhatsApp / click logs).
  var isEnquiry = (data.type || '').toLowerCase().indexOf('enquiry') !== -1 || !!data.phone;
  if (isEnquiry) {
    try {
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
    } catch (mailErr) {}
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

> When you deploy/authorise the script it will now also ask for permission to
> **send email as you** (Gmail) — approve it. Every enquiry then lands in both
> the Sheet **and** your inbox. WhatsApp/click logs are not emailed.

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

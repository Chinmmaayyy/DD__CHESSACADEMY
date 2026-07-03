/**
 * Lightweight lead / event capture to a Google Sheet via a Google Apps
 * Script Web App — no backend required.
 *
 * SETUP (one time):
 *  1. Create a Google Sheet.
 *  2. Extensions → Apps Script, paste the script from `docs/google-sheet-setup`
 *     (see project README) and Deploy → New deployment → Web app →
 *     "Anyone" access. Copy the /exec URL.
 *  3. Paste that URL into SHEETS_ENDPOINT below.
 *
 * Requests are sent with `mode: 'no-cors'` (fire-and-forget) so they never
 * block the user or throw on CORS. If the endpoint is empty, this no-ops.
 */
export const SHEETS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx6hfRqxfq_kXC29RA0VBMRlyHnBk5E_vf7_wwrx_dtbyX6spsFWRM9OB2iktnQl2Lg/exec'

export type LeadEvent =
  | { type: 'enquiry'; [k: string]: unknown }
  | { type: 'whatsapp_click'; source: string }
  | { type: 'call_click'; source: string }

export function logToSheet(event: LeadEvent): void {
  if (!SHEETS_ENDPOINT) return
  try {
    const payload = {
      ...event,
      timestamp: new Date().toISOString(),
      page: typeof location !== 'undefined' ? location.pathname : '',
    }
    // text/plain avoids a CORS preflight; Apps Script reads e.postData.contents.
    fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* never let analytics break the UX */
  }
}

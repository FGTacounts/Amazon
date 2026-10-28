// Vendor Central (vendorcentral.amazon.me) — read-only. Load one page at a time, ~10 s apart.
// Sales total for a period (end date <= "Report Updated" date):
//   /retail-analytics/dashboard/sales?custom-period=YYYY-MM-DDtoYYYY-MM-DD&submit=true
//   Total line = ordered revenue, ordered units, shipped revenue, shipped COGS, shipped units, returns.
await new Promise(r => setTimeout(r, 8000));
const t = document.body.innerText;
[(t.match(/Report Updated[^\n]*/) || ['?'])[0], (t.match(/Viewing Dates[^\n]*/) || ['?'])[0], (t.match(/Total:[^\n]*/) || ['?'])[0],
 /exceeded the number/.test(t) ? 'PAGE-LOAD LIMIT: stop vendor reading' : ''].join(' | ');

// Inventory by ASIN (/retail-analytics/dashboard/inventory?custom-period=...):
//   rows start with B0…, tab-separated; open PO qty = field 8 (index 7), sellable on hand units = field 15 (index 14).
//   const rows = document.body.innerText.split('\n').filter(l => /^B0/.test(l)).map(l => l.split('\t'));
// Sales by ASIN for the same 30 days: same filter on the sales page; shipped revenue = index 5, shipped units = index 7.
// POs: /po/vendor/members/po-mgmt/managepos?tabId=unconfirmed and ?tabId=confirmed — read with get_page_text.

// Business Reports by date:
// /business-reports/#/report?id=102%3ADetailSalesTrafficByTime&chartCols=&columns=0%2F1%2F2%2F3%2F4%2F5%2F6%2F7%2F8%2F9%2F10%2F11%2F12%2F13%2F14&fromDate=..&toDate=..
// Each date line (dd/mm/yyyy) is followed by Ordered Product Sales, Units, ...
await new Promise(r => setTimeout(r, 6000));
const t = document.body.innerText;
const i = t.indexOf('Ordered Product Sales');
t.slice(i, i + 4000).replace(/\n+/g, ' | ');
// Sales Dashboard "Today so far": /business-reports/#/dashboard, read the text after "Today so far".

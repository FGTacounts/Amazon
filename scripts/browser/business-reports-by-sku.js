// Seller Central (sellercentral.amazon.ae), Business Reports by SKU.
// 1) Navigate to:
//    /business-reports/#/report?id=102%3ADetailSalesTrafficBySKU&chartCols=&columns=0%2F1%2F2%2F3%2F6%2F17%2F19&fromDate=YYYY-MM-DD&toDate=YYYY-MM-DD
//    then location.reload() (the hash route needs a reload to apply new dates).
// 2) Run this. The grid is virtualised both ways: scroll it fully right first, then step down.
// Returns {sku: "sessions,units,sales"}.
await new Promise(r => setTimeout(r, 8000));
window.scrollTo(0, 0);
[...document.querySelectorAll('*')]
  .filter(e => e.scrollWidth > e.clientWidth + 100 && /auto|scroll/.test(getComputedStyle(e).overflowX))
  .forEach(e => e.scrollLeft = e.scrollWidth);
await new Promise(r => setTimeout(r, 1500));
const acc = {};
const grab = () => {
  const grids = [...document.querySelectorAll('div')].filter(d => d.childElementCount >= 6 && d.childElementCount < 3000 && /AED/.test(d.textContent));
  for (const g of grids) {
    const c = [...g.children].map(x => x.textContent.replace(/\s+/g, ' ').trim());
    c.forEach((v, j) => {
      if (/^AED ?[\d,.]+$/.test(v) && j >= 3 && c[j - 3] && c[j - 3].length < 30)
        acc[c[j - 3]] = [c[j - 2], c[j - 1], v.replace(/AED ?|,/g, '')].join(',');
    });
  }
};
const scrollers = [...document.querySelectorAll('*')].filter(e => e.scrollHeight > e.clientHeight + 100 && /auto|scroll/.test(getComputedStyle(e).overflowY));
for (let k = 0; k < 25; k++) { grab(); window.scrollBy(0, 300); scrollers.forEach(e => e.scrollTop += 300); await new Promise(r => setTimeout(r, 350)); }
grab();
Object.entries(acc).map(([k, v]) => k + ',' + v).join('\n');

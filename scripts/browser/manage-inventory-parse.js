// Manage All Inventory (myinventory/inventory?searchField=all&searchTerm=<SKU>).
// Lists ASIN, SKU, status, inputs (qty/price/min/max) and featured offer for each visible row.
// Note: the list can lag 15+ minutes after a save — always verify on the live offer list (aod-offers.js).
await new Promise(r => setTimeout(r, 8000));
const out = [];
const labels = [...document.querySelectorAll('*')].filter(e => e.childElementCount == 0 && e.textContent.trim() === 'SKU');
for (const l of labels) {
  let c = l;
  for (let k = 0; k < 15 && c; k++) { c = c.parentElement; if (c && c.querySelectorAll('kat-input').length >= 1 && /ASIN/.test(c.innerText)) break; }
  if (!c) continue;
  const tx = c.innerText.split('\n').map(s => s.trim()).filter(Boolean);
  if (tx.length > 80) continue;
  const asin = tx[tx.indexOf('ASIN') + 1], sku = tx[tx.indexOf('SKU') + 1];
  const fo = tx.indexOf('Featured offer');
  const st = tx.find(x => /^Available|^Inactive|^Out of stock|^Suppressed|^Incomplete/.test(x));
  const v = [...c.querySelectorAll('kat-input')].map(i => i.value);
  out.push([asin, sku, st, v.join('/'), fo >= 0 ? tx[fo + 1] : ''].join(' '));
}
[...new Set(out)].join('\n');

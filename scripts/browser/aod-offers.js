// Run in an amazon.ae tab (Claude in Chrome javascript_tool).
// Reads the full offer list for each ASIN and returns "seller@price" lines.
// Used for the vendor price-parity check: our offers show as "FGT L.L.C Middle East Seller",
// Amazon's own (vendor/1P) offer as "Amazon.ae". Our price must be >= Amazon.ae's.
const aod = async (asin) => {
  const h = await fetch('/gp/product/ajax/aodAjaxMain/ref=dp_aod_ALL_mbc?asin=' + asin + '&pc=dp&experienceId=aodAjaxMain').then(r => r.text());
  const d = new DOMParser().parseFromString(h, 'text/html');
  d.querySelectorAll('script,style').forEach(s => s.remove());
  const offers = [...d.querySelectorAll('#aod-pinned-offer, #aod-offer')].map(o => {
    const t = o.textContent.replace(/\s+/g, ' ');
    const price = (t.match(/AED\s?([\d,]+\.\d\d)/) || [])[1];
    const sb = o.querySelector('#aod-offer-soldBy');
    const seller = sb ? sb.textContent.replace(/\s+/g, ' ').replace('Sold by', '').trim() : '';
    const delivery = (t.match(/(FREE delivery|AED [\d.]+ delivery)/) || [])[0] || '';
    return { seller, price: price ? Number(price.replace(',', '')) : null, delivery };
  });
  return { asin, offers };
};

// Example: a short list; the daily run uses every ASIN in vendor_asins plus our seller ASINs.
const ASINS = ['B0GPJV6DZK', 'B0DHLW86GB', 'B0FR5BKGQX'];
const out = [];
for (const a of ASINS) { out.push(await aod(a)); await new Promise(r => setTimeout(r, 1200)); }
// Flag parity problems
out.map(r => {
  const amz = r.offers.find(o => /^Amazon\.ae/.test(o.seller));
  const ours = r.offers.filter(o => /FGT/.test(o.seller));
  const low = amz && ours.some(o => o.price != null && o.price < amz.price);
  return r.asin + ' ' + r.offers.map(o => o.seller.slice(0, 12) + '@' + o.price).join(' ; ') + (low ? '  <-- OURS BELOW AMAZON' : '');
}).join('\n');

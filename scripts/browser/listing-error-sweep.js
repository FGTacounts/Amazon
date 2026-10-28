// Run in an amazon.ae tab. For each ASIN: title, price, unit price (catches "AED 34,875/l" errors),
// availability ("Only N left"), buy-box seller and strike price.
const chk = async (a) => {
  const h = await fetch('/dp/' + a + '?language=en_AE').then(r => r.text());
  const d = new DOMParser().parseFromString(h, 'text/html');
  d.querySelectorAll('script,style').forEach(s => s.remove());
  const g = s => ((d.querySelector(s) || {}).textContent || '').replace(/\s+/g, ' ').trim();
  const unit = [...h.matchAll(/AED\s?[\d,]+(?:\.\d+)?\s*(?:<[^>]+>\s*)*\/\s*(?:<[^>]+>\s*)*([A-Za-z0-9 ]{1,20})/g)].map(x => x[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' '))[0] || '';
  return [a, g('#productTitle').slice(0, 40), g('#corePrice_feature_div .a-offscreen'), unit, g('#availability').slice(0, 30),
          'BB:' + (g('#sellerProfileTriggerId') || g('#merchantInfoFeature_feature_div .offer-display-feature-text')).slice(0, 25),
          'was:' + g('.basisPrice .a-offscreen')].join(' | ');
};
const ASINS = ['B0DHLW86GB', 'B0DHLWTV57', 'B0GMGJNY6K', 'B0GMCYBBPJ', 'B0FKZT4XCP', 'B0FR5BKGQX'];
const out = [];
for (const a of ASINS) { out.push(await chk(a)); await new Promise(r => setTimeout(r, 700)); }
out.join('\n');

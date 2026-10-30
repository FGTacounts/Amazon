# Runbook

Order each evening: Part 0 stock → price parity → ads review → Vendor Central → competitors → listing error sweep → listing reviews → other marketplaces → dashboards → report → summary. The full rules are in `task/daily-run-prompt.md`.

## Stock (Part 0)
- Warehouse: `~/Downloads/noon/inbox/AE/<date>/billing-stock-<date>.csv` (Famlist Billing v5 snapshot; read with python csv, values are quoted). Never write to v5.
- Merchant (MFN) quantities: Manage All Inventory, search the SKU.
- FBA: stranded units show at `/inventoryplanning/stranded-inventory` — a merchant-fulfilled listing with units at FBA is "stranded"; fix with "1-click change to FBA" (done 28 Oct for TTS5060 and Dino2).

## Price parity
- `scripts/browser/aod-offers.js` on every vendor ASIN and every seller ASIN Amazon.ae also sells. Our offers appear as "FGT L.L.C Middle East Seller".
- If Amazon.ae is out of stock, its last price ≈ vendor shipped revenue per unit × 1.05.

## Editing in Seller Central
- Price / quantity: Manage All Inventory → triple-click the field → type → Enter → "Save all" → wait for "Changes to your inventory have been saved". **Verify on the live offer list 15+ minutes later.** 28 Oct: the first TTS721 save said "saved" but didn't take; the second did.
- Listing attributes (e.g. Unit Count): `/interactive/listing/workflow/edit/product_details?sku=<SKU>&productType=BABY_PRODUCT&asin=<ASIN>`. The form is long: scroll the input into view with `window.scrollTo`, click by coordinate, `cmd+a`, type, Submit → "Edits submitted" (live within 24 h).
- A 12-digit UPC in the EAN field blocks Submit: enter the same barcode with a leading 0 (13 digits).
- Avoid the "Sell in other marketplaces" toggle at the top of the Offer tab; if it flips by accident, leave without submitting.

## Unit price errors found 28 Oct
Cleanser packs showed AED 27,500–59,500 per litre because Unit Count was 2 millilitre. Correct values: PRO-1000-2 = 2000 ml, PRO-1000-3 / PRO-1000-3-TT701 = 3000 ml, PRO-500-3-TT701 = 1500 ml. PRO-1000-3-MFN (B0DHLW86GB) was fixed 28 Oct but still showed the wrong price that night — recheck.

## Business Reports
- By date: `scripts/browser/business-reports-by-date.js`.
- By SKU: `scripts/browser/business-reports-by-sku.js` (virtualised grid; scroll right first, then down; reload after changing dates).

## Ads
- Campaign Manager's date-range control can be stuck on an old range — set it first. Scroll the grid right to see spend and purchases; sales per campaign isn't in that view.
- Claude's campaign: "Claude | Glitters | Funky 3D socks | 11.11 | 26" — 9–12 Nov, AED 30/day, 7 sock ASINs, 18 phrase + exact keywords, dynamic bids down only.

## Vendor Central
- `scripts/browser/vendor-central.js`. One page every ~10 s; stop on "exceeded the number of page load requests". Read-only — never confirm or change POs.
- Amazon Now: check the product page's delivery block, not the site menu (which always says "Amazon Now").

## Other marketplaces
- The Aashna account sells in UAE, India and Saudi Arabia (US, Canada, Mexico registered, no sales). Home page Sales card → "Choose marketplaces" (amounts in AED).
- India's own Seller Central (sellercentral.amazon.in) needs a sign-in — never type credentials; ask the owner. Switch back to UAE at `/global-picker`.

## Dashboards
- Amazon dashboard datasets: run_log, run_actions, team_todos, uae_daily_sales, uae_sku_stock, vendor_daily_sales, vendor_pos, vendor_asins, competitors, **and** markets, skus, history, ads_markets, ads_campaigns, ads_actions (these drive the header date and the Sales/Stock/Ads tabs — until 28 Oct they were never refreshed and the page said "updated 6 days ago"). ads_waste is a fixed 90-day snapshot of 23 Oct.
- Each file: upload as an asset, then update `datasets/<id>` `source.url` and `updated` in one batch.
- Combined dashboard: no longer updated (owner, 29 Oct).

## When Chrome or the Mac drops
Keep doing the cloud-side work, check every 2–3 minutes for up to 30 minutes, then finish every unfinished item. The report still gets saved (send it in chat first, write it to the noon folder when the Mac is back).

## Browser fallback (29 Oct)
If the Claude in Chrome extension isn't connected, use the desktop Chrome control tools (list_tabs, open_url, execute_javascript, switch_to_tab, close_tab). Kat inputs sit in shadow DOM: focus the inner input, select(), `document.execCommand('insertText', false, value)`, dispatch `change`, blur; click the inner button of the kat-button. Listing-editor pages ignore `location` changes — open a fresh tab. Virtualised grids (Business Reports, Campaign Manager) only render in the visible tab. Public amazon.ae pages can be read with fetch in Claude's built-in browser.

## Known open issues (29 Oct)
- PRO-1000-3-MFN (B0DHLW86GB) and PRO-1000-2 (B0DHLWTV57) still show the wrong unit price: Amazon's vendor content wins over the seller edit — needs the vendor manager (T-019).
- TTS5061 merchant quantity was found reset from 10 to 0 on 29 Oct — check it every run.
- PRO-1000-1 (B0DHLW6QBR): active, 10 listed, but no featured offer and "Currently unavailable".

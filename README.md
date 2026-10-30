# Amazon — daily run (Turtees / Glitters, Famlist General Trading LLC)

Everything behind the evening Amazon run (UAE and India) that Claude does for the owner: the scheduled task's instructions, daily reports, the data behind the Amazon dashboard, and the browser scripts used to read Seller Central, Amazon.ae and Vendor Central.

**Goal:** AED 50,000 of Amazon UAE sales in each of November and December 2026 (seller account + Vendor Central shipped revenue).

## What's here

| Path | What it is |
|---|---|
| `task/daily-run-prompt.md` | Copy of the prompt the scheduled task "Daily Amazon UAE growth run" sends at 21:00 Gulf time (copied 30 Oct, includes India). The task itself is the source of truth. |
| `reports/` | One report per run (`YYYY-MM-DD-amazon-daily-run.md`): sales, changes made (before → after), vendor, competitors, stock, to-dos. |
| `dashboard/datasets/` | The JSON files behind the [Amazon dashboard](https://claude.ai/artifact/Lvg4iNXu59aX183pvHzGRb) as of the last commit (Sales, Stock, Ads, Vendor and Daily runs tabs). |
| `scripts/browser/` | JavaScript snippets run in the owner's Chrome (Claude in Chrome) to read pages. |
| `docs/runbook.md` | How each part of the run is done, page addresses, and gotchas learned so far. |
| `docs/decisions.md` | Owner decisions and standing rules, with dates. |

## Links

- Amazon dashboard: https://claude.ai/artifact/Lvg4iNXu59aX183pvHzGRb
- Seller Central UAE: https://sellercentral.amazon.ae (account "Aashna Retail AE")
- Vendor Central: https://vendorcentral.amazon.me (vendor code GSGX2)
- Ads: https://advertising.amazon.ae/campaign-manager/all-campaigns

## Privacy

No landed costs, passwords, keys or customer data go in this repo. Warehouse stock comes from the Famlist Billing v5 snapshot in the noon folder (`inbox/AE/<date>/billing-stock-<date>.csv`), which is not copied here.

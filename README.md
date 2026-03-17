# Berkeley Tax Measure Impact Calculator

Interactive tool that estimates the year-over-year property tax increase for Berkeley homeowners based on proposed and existing tax measures.

**Live site:** https://berkeley-tax-calculator.vercel.app

## Pages

### Calculator (`index.html`)
Select your home's **assessed value** and **square footage** from the dropdowns. The calculator shows your estimated annual tax increase, broken down by measure. Toggle any measure on or off to model different election outcomes. Optionally enter last year's total property tax bill to see the increase as a percentage. Expand the full comparison matrix to see every AV × sq ft combination at a glance.

### Tax Bill Explained (`explained.html`)
A complete guide to every line item on a typical Berkeley/Alameda County property tax bill — ad valorem rates, city parcel taxes, school district levies, other assessments, and all proposed 2026 measures with their current status.

## Measures Included

| Measure | Basis | Rate |
|---------|-------|------|
| Public Bank Tax | per sq ft | $0.06/sf |
| Arts Tax | per sq ft | $0.07/sf |
| Infrastructure Bond | assessed value | $44/$100k AV |
| Berkeley Sales Tax Increase | flat estimate | +0.5% |
| County Sales Tax (BART) | flat estimate | +0.5% |
| Parcel Tax Rate Increase | per sq ft | $0.0534/sf |

All results include the Prop 13 baseline increase (AV × 2% × 1.2323%) regardless of which measures are checked.

## Planned: Community Voting Page

A future page where Berkeley residents can record which proposed tax measures they would support. Concept:

- **Anonymous straw poll** — users check the measures they'd vote yes on, hit submit
- **Live results** — aggregated bar chart or tally showing community sentiment per measure
- **No login required** — lightweight, low-friction (fingerprint or localStorage to limit one vote per browser)
- **Backend** — Upstash Redis (already used on other projects, free tier) to store vote counts
- **Privacy** — no PII collected, no IP logging, just measure-level tallies

This would turn the calculator from a personal planning tool into a neighborhood conversation starter — "here's what it costs me, and here's what my neighbors think is worth it."

## Tech

Static HTML, no build step, no framework. Fonts loaded from Google Fonts (Source Sans 3, JetBrains Mono). Deployed on Vercel with Vercel Analytics.

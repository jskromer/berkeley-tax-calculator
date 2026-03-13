# Berkeley Tax Measure Impact Calculator

Interactive single-page tool that estimates the year-over-year property tax increase for Berkeley homeowners based on proposed tax measures.

**Live site:** https://berkeley-tax-calculator.vercel.app

## How it works

Select your home's **assessed value** and **square footage** from the dropdowns. The calculator shows your estimated annual tax increase, broken down by measure. Toggle any measure on or off to model different election outcomes.

### Measures included

| Measure | Basis | Rate |
|---------|-------|------|
| Public Bank Tax | per sq ft | $0.06/sf |
| Arts Tax | per sq ft | $0.07/sf |
| Infrastructure Bond | assessed value | $44/$100k AV |
| Berkeley Sales Tax Increase | flat estimate | +0.05% |
| County Sales Tax (BART) | flat estimate | +0.05% |
| Parcel Tax Rate Increase | per sq ft | $0.0534/sf |

All cells include the Prop 13 baseline increase (AV × 2% × 1.2323%) regardless of which measures are checked.

Optionally enter last year's total property tax bill to see the increase as a percentage.

## Tech

Single HTML file, no dependencies, no build step. Fonts loaded from Google Fonts (Source Sans 3, JetBrains Mono).

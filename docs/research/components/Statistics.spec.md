# Statistics Component Specification

## Overview
The Statistics section (titled "THỐNG KÊ VỀ CHÚNG TÔI") features a unique vertical carousel of data cards, showcasing key achievements and metrics.

## Visual Tokens
- **Container Max-Width:** 1024px
- **Title:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 32px
  - Weight: 700
  - Text-Transform: `uppercase`
  - Colors: "Thống kê" (Viettel Red `#EE0033`), "về chúng tôi" (Dark Gray `#303030`)
- **Card Styling:**
  - Background: `linear-gradient(to right, rgb(254, 241, 244), rgb(252, 207, 217))` (Pale pink to pink)
  - Active Card Background: `linear-gradient(to right, rgb(255, 52, 52), rgb(46, 46, 46))` (Red to dark gray)
  - Border Radius: 12px
  - Shadow: `rgba(0, 0, 0, 0.1) 0px 4px 10px 0px`
  - Height: 189px
- **Typography in Cards:** (Need to extract deeper for numbers/labels)
  - Numbers: Large, bold.
  - Labels: Muted or secondary text.

## Structure
- **Root:** `.sc-ivWwiH.kcfFJe` (Index 11)
  - **Title:** "THỐNG KÊ VỀ CHÚNG TÔI"
  - **Vertical Carousel:** `.slick-vertical`
    - Contains multiple cards.
    - Uses perspective-like transforms: `matrix(0.85, 0, 0, 0.85, 0, -240.975)` for non-active cards.

## Implementation Details
- **Carousel:** A vertical `Embla Carousel` with custom logic to apply scaling and opacity based on the active index.
- **Counter:** Use `react-countup` for the numerical animation when the section enters the viewport.
- **Icons:** Use the `statistical.svg` (Extracted URL: `https://sme.viettel.vn/media/sme//homepage/statistic/statistical.svg`) as a background or inline SVG.

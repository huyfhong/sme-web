# Hero Component Specification

## Overview
The Hero section is a full-width carousel (slider) that serves as the primary visual entrance to the SME HUB website. It features large high-resolution banners and interactive elements.

## Visual Tokens
- **Height:** 900px (desktop)
- **Max-Width:** 1280px (content container)
- **Backgrounds:**
  - `sme_hub_banner.png` (Extracted URL: `https://sme.viettel.vn/media/sme//homepage/banner/sme_hub_banner.png`)
  - Background properties: `50% 50% / cover no-repeat`
- **Spacing:**
  - `margin-bottom: 21.6px` (on the main banner container)

## Structure
- **Root:** `.sc-hXaejr.bEKMro` (relative container)
  - **Carousel Wrapper:** `.ant-carousel`
    - **Slick Slider:** `.slick-slider`
      - **Slider Item:** `.background_home_page`
        - Features a large background image.
        - Contains absolute-positioned SVGs for decorative elements.

## Implementation Details
- **Carousel Library:** Use `Embla Carousel` or `shadcn/ui` Carousel component (which uses Embla).
- **Images:** Use `next/image` for the banner if possible, or `background-image` with `background-size: cover` as per the target.
- **Responsive:**
  - Mobile: Height should scale down (check mobile screenshots).
  - Current desktop spec is based on 1280px viewport.

## Key Styles (from computed styles)
```json
{
  "width": "1280px",
  "height": "900px",
  "background": "url('...') 50% 50% / cover no-repeat",
  "position": "relative"
}
```

## Decorative Elements
- **SVGs:** There are absolute-positioned SVGs inside the banner.
  - SVG 1: `width: 288px`, `height: 329px`, `bottom: 250px`, `left: 0px`.
  - These should be implemented as separate components or inline SVGs to match the target's interactive feel.

# Products Component Specification

## Overview
The Products section (titled "DỊCH VỤ CHẤT LƯỢNG") displays a curated list of digital services in a carousel format, along with a search bar and a "View More" button.

## Visual Tokens
- **Container Max-Width:** 1024px (centered with `margin: 0 auto`)
- **Background Color:** `rgb(255, 255, 255)` (White) for the inner card, `rgb(245, 245, 245)` (Light Gray) for the section background.
- **Title:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 28px
  - Weight: 900
  - Colors: "DỊCH VỤ" (Black), "CHẤT LƯỢNG" (Viettel Red `#EE0033`)
- **Search Bar:**
  - Border: `1px solid rgb(217, 217, 217)`
  - Border Radius: 100px (Pill shape)
  - Height: 44px
  - Placeholder Font: `Sarabun, serif`
- **Primary Button ("Xem thêm"):**
  - Background: Viettel Red `#EE0033`
  - Color: White `#FFFFFF`
  - Border Radius: `8px 8px 8px 0px` (Unique Viettel style)
  - Shadow: `rgba(0, 0, 0, 0.043) 0px 2px 0px 0px`

## Structure
- **Root:** `.sc-ivWwiH.kcfFJe`
  - **Header Area:**
    - Title on the left.
    - Search bar and "Nhận tư vấn" button on the right.
  - **Carousel:** `.ant-carousel`
    - Vertical or horizontal slider (check target behavior).
    - Contains product cards.
  - **Footer Area:**
    - "Xem thêm tại Chợ Ứng dụng" button.

## Component Breakdown
- **Product Card:** (Need to extract deeper if missing)
  - Bordered or shadow-based cards.
  - Usually features an icon, title, and short description.

## Implementation Details
- **Carousel:** Use `Embla Carousel` with a custom implementation to match the target's "slick-slider" look.
- **Search:** Implement a controlled input within a rounded container.
- **Button Component:** Create a reusable `ViettelButton` component with the `8px 8px 8px 0px` border-radius.

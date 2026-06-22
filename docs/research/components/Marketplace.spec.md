# Marketplace Component Specification

## Overview
The Marketplace page (titled "CHỢ ỨNG DỤNG VIETTEL") is a comprehensive platform for browsing and filtering Viettel's digital services.

## Visual Tokens
- **Banner Title:** `"FS PF BeauSans Pro"`, 40px, 700 weight. "CHỢ ỨNG DỤNG" (Black), "VIETTEL" (Red `#EE0033`).
- **Banner Subtitle:** `Roboto`, 20px, 400 weight, `#282828`.
- **Sidebar Search:** 
  - Border: `1.5px solid #737373`
  - Border Radius: `10px 10px 10px 0px`
- **Category Sidebar Background:** `linear-gradient(to bottom, #F7F8FA, rgba(247, 248, 250, 0.7))`
- **Product Card Background:** `url('/images/bg-item.png')` with `contain` sizing.
- **Product Grid:** 3 columns on desktop, 1 on mobile.

## Structure
- **Top Section:** Banner with image (left 20%) and text (right 80%).
- **Main Layout:** 
  - **Sidebar (20%):** Search input and vertical category list.
  - **Content (80%):** 
    - Featured Carousel at the top with background `background-slide.svg`.
    - Responsive grid of product cards.

## Implementation Details
- **Route:** `src/app/market-place/page.tsx`
- **Carousel:** Use `embla-carousel-react` for the featured items.
- **Components:**
  - `MarketBanner`: The header section.
  - `MarketSidebar`: Search and category filters.
  - `ProductCard`: Individual card with rating and image.
- **Rating:** Use a simple star component (Lucide `Star`).

## Assets
- **Banner Image:** `https://sme.viettel.vn/media/sme//market-place/banner.png`
- **Card Background:** `https://sme.viettel.vn/media/sme//market-place/bg-item.png`
- **Slider Background:** `https://sme.viettel.vn/media/sme//market-place/background-slide.svg`

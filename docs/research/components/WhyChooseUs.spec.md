# WhyChooseUs Component Specification

## Overview
This section explains the benefits of choosing SME HUB, featuring three key value propositions and an embedded video.

## Visual Tokens
- **Container Max-Width:** 1024px
- **Title:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 32px
  - Weight: 700
  - Color: `rgba(0, 0, 0, 0.85)`
- **Subtitle/Heading:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 24px
  - Weight: 700
  - Color: `rgb(48, 48, 48)`
- **Body Text:**
  - Font: `Roboto`
  - Size: 16px
  - Color: `rgb(115, 115, 115)`
- **Video:**
  - Border Radius: 20px
  - Scale: `transform: scale(0.7)` (as per computed `matrix(0.7, ...)` styles)
  - Overflow: hidden

## Structure
- **Root:** `.sc-ivWwiH.kcfFJe` (Index 5)
  - **Header:** "VÌ SAO CHỌN SME HUB CỦA VIETTEL?"
  - **Grid/Flex Area:** Three items with titles and descriptions.
    - Item 1: "Chất lượng đảm bảo"
    - Item 2: "Thanh toán linh hoạt" (Need to verify text from live or other data)
    - Item 3: "Hỗ trợ tận tâm" (Need to verify text)
  - **Video Container:** `.video-desktop`
    - Contains a `react-player` with an `iframe`.

## Implementation Details
- **Grid:** Use a simple flexbox or CSS grid for the three items.
- **Video:** Use a standard YouTube embed or `react-player` if needed, applying the 20px border radius and the 0.7 scale.
- **Typography:** Ensure "FS PF BeauSans Pro" is correctly mapped in Tailwind.

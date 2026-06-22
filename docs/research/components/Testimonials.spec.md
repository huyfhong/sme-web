# Testimonials Component Specification

## Overview
The Testimonials section (titled "ĐỐI TÁC NÓI GÌ VỀ CHÚNG TÔI") showcases feedback from various partners using a clean, offset layout and decorative SVGs.

## Visual Tokens
- **Container Max-Width:** 1024px
- **Title:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 32px
  - Weight: 700
  - Colors: "ĐỐI TÁC" (Viettel Red `#EE0033`), "NÓI GÌ VỀ CHÚNG TÔI" (Dark Gray `#000000` with 0.85 opacity)
- **Testimonial Text:**
  - Font: `Roboto`
  - Size: 16px
  - Line-Height: 25px
  - Color: `rgb(48, 48, 48)`
- **Partner Name:**
  - Font: `"FS PF BeauSans Pro"`
  - Size: 20px
  - Weight: 700
  - Color: `rgba(0, 0, 0, 0.85)`

## Structure
- **Root:** `.sc-ivWwiH.kcfFJe` (Index 12)
  - **Decorative SVG:** A large SVG (500x150) used as a background element.
  - **Flex Container:** `.item-side`
    - Contains three testimonial items.
    - Each item has a specific translation (`transform: matrix(...)`) to create an asymmetrical/offset look.

## Implementation Details
- **Layout:** Use absolute or relative positioning with offsets to match the target's "matrix" transforms.
- **Decorative Elements:** Replicate the SVG or use a high-quality placeholder that matches the target's aesthetic.
- **Responsive:** Check how the offset layout collapses on mobile (usually becomes a single column stack).

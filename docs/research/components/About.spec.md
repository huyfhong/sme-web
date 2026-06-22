# About Component Specification

## Overview
The "About" section (titled "SME HUB là gì?") provides a high-level introduction to the platform using three key feature cards with icons.

## Visual Tokens
- **Container Max-Width:** 1024px
- **Title:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 32px
  - Weight: 700
  - Text-Transform: `uppercase`
  - Colors: "SME HUB" (Viettel Red `#EE0033`), "là gì ?" (Dark Gray `#303030`)
- **Subtitle:**
  - Font: `"FS PF BeauSans Pro", serif`
  - Size: 20px
  - Color: `rgb(120, 120, 120)`
- **Card Styling:**
  - Background: `rgb(247, 247, 247)` (Very light gray)
  - Border Radius: 10px
  - Padding: 5px
  - Margin: 5px
- **Typography in Cards:**
  - Font: `Roboto, serif`
  - Size: 18px
  - Line-Height: 28.287px
  - Color: `rgba(0, 0, 0, 0.85)`

## Structure
- **Root:** `.sc-ivWwiH.kcfFJe` (Index 1)
  - **Header Area:** Title and subtitle centered.
  - **Icon Row:** Three icons centered above their respective text.
  - **Text Card Row:** Three cards containing the descriptive text.

## Implementation Details
- **Grid:** Use a 3-column flexbox or grid for the icons and cards.
- **Icons:** Use `next/image` for the three introduction icons.
  - Icon 1: `sme_hub_introduction_icon_1.png`
  - Icon 2: `sme_hub_introduction_icon_2.png`
  - Icon 3: `sme_hub_introduction_icon_3.png`
- **Spacing:** Ensure 2% gap between cards as per the target's flex layout.

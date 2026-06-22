# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/desktop-full.png` (Top section)
- **Interaction model:** Sticky (via `ant-affix` pattern)

## DOM Structure
- `div` (Wrapper with `height: 80px`)
  - `div` (Sticky container, `position: fixed`, `top: 0`, `width: 100%`)
    - `div` (Flex container, `justify-content: center`)
      - `div` (Inner container)
        - `a` (Logo link)
          - `img` (Logo)
        - `nav` (Navigation items)
        - `div` (Search/User actions)

## Computed Styles (exact values)
- height: 80px
- position: fixed (when scrolled)
- backgroundColor: #FFFFFF (typically)
- zIndex: 200
- borderBottom: 1px solid #E6E6E6 (seen in style of logo link)

## Assets
- Logo: `public/images/viettel-logo.svg` (or similar)

## Navigation Items
- Trang chủ (Home)
- Sản phẩm (Products)
- Dịch vụ (Services)
- Tin tức (News)
- ... (To be refined from HTML)

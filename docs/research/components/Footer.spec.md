# Footer Component Specification

## Overview
The Footer is a multi-column section featuring site navigation, contact information, an email subscription form, and social media links. It uses a card-like inner container with rounded corners.

## Visual Tokens
- **Root Background:** `rgb(255, 255, 255)` (White)
- **Inner Container:**
  - Background: `rgb(247, 248, 250)` (Light Grayish-Blue)
  - Border Radius: 20px
  - Max-Width: 1024px
  - Padding: 30px
- **Bottom Bar:**
  - Background: `rgb(234, 236, 240)` (Slightly darker gray)
  - Border Radius: `0px 0px 20px 20px`
- **Typography:**
  - Heading ("nameColumn"): `"FS PF BeauSans Pro"`, 20px, 600 weight, `rgba(0, 0, 0, 0.85)`
  - Links: `"FS PF BeauSans Pro"`, 16px, `rgb(117, 117, 117)`
  - Body Text: `Roboto`, 16px, 28px line-height, `rgb(40, 40, 40)`

## Structure
- **Root:** `#footer.sc-ozfey8-0.cdOXyu`
  - **Inner Wrapper:** `.sc-ozfey8-2.jYOsPs`
    - **Logo Section:** Viettel logo and certification logos.
    - **Column 1 ("Khám phá"):** Links like "Về Viettel".
    - **Column 2 ("Liên hệ"):** Links like "Chat online CSKH", "Dành cho đối tác".
    - **Column 3 ("Hỗ trợ"):** Links like "Câu hỏi thường gặp", "Điều khoản sử dụng".
    - **Column 4 ("Theo dõi..."):** Email input and "Đồng ý" button.
    - **Social Bar:** `.link-social` aligned to the right.

## Implementation Details
- **Grid:** Use a 4-column grid or flexbox for the main links.
- **Input:** Use a pill-shaped input for the email.
- **Button:** Use the `ViettelButton` component with red background and unique border-radius.
- **Logos:** Use extracted SVG/PNG assets for Viettel and social logos.

# Session Summary

## Goal
Build admin page with separate `admins` table, fix related products layout, fix scroll-to-top, add Viettel logo to auth pages, restructure project into `backend/`/`frontend/`/`chatbot/`.

## Project Structure
```
sme-clone/
├── router.php                     ← PHP built-in server router
├── index.html                     ← Frontend entry (served by router)
├── backend/
│   └── api/
│       ├── config.php             ← DB connection, CORS, JSON helpers
│       └── index.php              ← REST routing, admin auth, CRUD
├── frontend/
│   ├── css/                       ← All stylesheets
│   ├── js/
│   │   ├── pages/                 ← Page renderers (home, admin, login, …)
│   │   ├── config.js              ← API_BASE_URL
│   │   ├── api.js                 ← Token-routing HTTP client
│   │   ├── main.js                ← App routes, consultation form, dialogs
│   │   ├── router.js              ← SPA router, scroll-to-top, admin mode
│   │   └── utils.js               ← Helpers
│   └── images/                    ← Static images
├── chatbot/
│   ├── BE_chatbot/
│   │   ├── api/chatbot.php
│   │   ├── data/chat_bot_rule.json
│   │   └── models/ChatbotCls.php
│   └── FE_chatbot/
│       ├── css/chat_bot.css
│       └── js/views/
│           ├── chat_logic.js
│           └── ChatbotComponent.js
├── smeweb.sql
├── assets/
├── docs/
└── vd/
```

## How to Run
```bash
cd sme-clone
php -S localhost:8000 router.php
```
Open http://localhost:8000/ in browser.

**Or** use Live Server on port 5500 for frontend + PHP server on port 8000 for API.

## Session (Jun 24)

### Staff Page (`#/team`)
- Created `staff` table in DB with seed data (12 members)
- `backend/api/index.php`: `handleGetStaff()` (public), `handleGetAdminStaff()`, `handleCreateStaff()`, `handleUpdateStaff()`, `handleDeleteStaff()`
- `frontend/js/pages/team.js` — `renderTeam()` fetches `/staff`, renders responsive card grid with background-image avatar
- Nav item "Giới thiệu nhân viên" → `#/team` route in `main.js`
- Admin "Nhân viên" tab with full CRUD (table list + form with avatar upload via base64)
- CSS: 3-column grid (max-width 1400px), avatar 170px, border-radius 16px, border 4px, background-image with `background-position: center`
- `favicon.ico` route fix in `router.php`

### Static Image Path
- Staff avatars stored at `frontend/images/staff/` (12 files)
- `saveBase64Image()` returns bare filename → team.js checks `startsWith('images/')` before prepending

### Router Changes
- Added CORS preflight handler at top of `router.php` — OPTIONS requests return 200 with CORS headers (fix for PHP built-in server not passing OPTIONS to router)

### Key Files (new)
- `frontend/js/pages/team.js`: Staff card renderer
- `frontend/images/staff/`: 12 staff avatar images

## Session (Jun 25)

### Staff Page UI Polish
- Avatar display changed from `<img>` to `background-image` with `background-position: center` for perfect centering
- Avatar size: 80px → 140px → 150px → **170px** (desktop)
- Grid columns: 4 → 3 → 2 → back to **3 columns** (max-width **1400px**)
- Border: removed red → replaced with **4px solid #ddd** (light gray)
- Font sizes increased: name **20px bold**, position **16px**, info **15px**
- Card border-radius: 12px → **16px**, shadow increased
- Responsive breakpoints: tablet 992px → 2 cột, mobile 768px → 2 cột, 480px → 1 cột
- Admin table avatar preview uses 40px round with fallback initial letter

### CORS Fix
- Added OPTIONS handler at top of `router.php` — PHP built-in server doesn't pass OPTIONS requests to router by default, causing CORS preflight to fail
- `router.php`: first check `$_SERVER['REQUEST_METHOD'] === 'OPTIONS'` → return 200 with `Access-Control-Allow-Origin: *`

### Nav Overlap Fix
- `.team-page` and `.solution-page` padding changed from `60px 0` to `calc(var(--header-height) + 20px) 0 60px` to prevent titles from being hidden behind fixed nav (header height: 72px desktop / 60px mobile)

### Product Dropdown in Consultation Form (Jun 29)
- `main.js`: Changed `openConsultationModal()` from hardcoded product list to async fetch via `api.getProducts({ limit: 100 })`
- Now shows real products from database instead of hardcoded list
- "Khác" always appended as last option; fallback to `['Khác']` if API fails

### Product Name Overflow in Services Slider (Jun 29)
- `home.css`: Added `min-width: 0`, `width: 100%` to `.pcs-product` and `.pcs-product-info`
- Changed `.pcs-product-info strong` from `white-space: nowrap` to `display: -webkit-box` (2-line clamp) + `word-break: break-word`
- Fixes long product names pushing into adjacent slides

### Project Restructuring (Previous Session)
- `api/` → `backend/api/`
- `css/`, `js/`, `images/` → `frontend/`
- `index.html` → root (moved from `frontend/`)
- `chatbot_rule/` → `chatbot/` (flattened: `chatbot/BE_chatbot/` + `chatbot/FE_chatbot/`)
- Created `router.php` at root — routes `/api/*` to backend, `/chatbot/BE_chatbot/api/*` to chatbot backend, serves static files with fallback to `frontend/`
- Updated path references in 4 files:
  - `index.html`: chatbot paths `chatbot/FE_chatbot/...`
  - `backend/api/index.php`: image save path `__DIR__ . '/../../frontend/images/'`
  - `chatbot/FE_chatbot/js/views/ChatbotComponent.js`: API URL `/chatbot/BE_chatbot/api/chatbot.php`

### Admin Page (`#/admin`)
- **Database**: `admins` table (id, name, email, password, token, created_at) and `consultations` table (id, name, phone, email, product, message, status, created_at)
- **Backend**: `handleAdminLogin()`, `requireAdmin()` queries `admins` table, GET `/admin/users` + `/admin/consultations` protected by Bearer token
- **Frontend**: Inline login form, 3 tabs (Tài khoản / Tư vấn / Sản phẩm), CRUD products + packages, image upload via base64, success dialogs
- **CSS**: Admin layout, `body.admin-mode` hides header/footer/chatbot

### API Changes
- `api.js`: Auto-detects `/admin/` endpoints, uses `admin_token`, clears correct token on 401
- `adminLogin()`, product/package CRUD methods
- `upload()` + `uploadImage()` removed (replaced by base64 in JSON)

### Chatbot
- Bubble right, user messages red (`--primary`), 8 Viettel FAQ rules + "Nhận tư vấn" button
- Suggestion questions displayed above input
- Admin page hides chatbot via `body.admin-mode`

### Other Features
- Scroll-to-top on route change
- Phone validation (10 digits) in consultation form
- Marketplace: banner 160×169, featured slider removed, Hotline added
- Consultation form: if chatbot open → bot message; if closed → success dialog
- `showAdminSuccessDialog()` in `main.js` for all admin success notifications

## Key Files
- `router.php`: PHP built-in server router — API routes, static file serving, SPA fallback
- `backend/api/index.php`: Full REST routing, `saveBase64Image()`, `requireAdmin()`, admin product/package CRUD
- `backend/api/config.php`: DB connection, CORS headers, JSON response helpers
- `frontend/index.html`: SPA entry, imports all CSS/JS
- `frontend/js/pages/admin.js`: Inline login, 3 tabs, product manager + CRUD
- `frontend/js/pages/home.js`: Home page renderer
- `frontend/js/api.js`: Token routing for admin/user, HTTP methods
- `frontend/js/main.js`: Routes, `submitConsultationForm()`, `showSuccessDialog()`, `showAdminSuccessDialog()`
- `frontend/js/config.js`: `API_BASE_URL: 'http://localhost:8000/api'`
- `frontend/js/router.js`: Scroll-to-top, admin-mode cleanup on route change
- `frontend/css/admin.css`: Admin layout, `body.admin-mode` hiding
- `frontend/css/pages.css`: Related carousel, page-specific styles
- `chatbot/BE_chatbot/api/chatbot.php`: Chatbot API endpoint
- `chatbot/BE_chatbot/data/chat_bot_rule.json`: 8 Viettel FAQ rules
- `chatbot/BE_chatbot/models/ChatbotCls.php`: Keyword matching logic
- `chatbot/FE_chatbot/js/views/ChatbotComponent.js`: Suggestion questions, API URL
- `chatbot/FE_chatbot/js/views/chat_logic.js`: `toggleChat()`, `renderMessage()`
- `chatbot/FE_chatbot/css/chat_bot.css`: Bubble/container, suggestions, user red bg

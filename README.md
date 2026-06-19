# ⚡ FlashCab Cables — Full Stack Web Application

> Cable manufacturer website with dynamic admin panel  
> **Stack:** PHP 8.2 + MySQL (production) | React + Vite (frontend) | JWT Auth

---

## 📁 Project Structure

```
flashcab_cables/
│
├── 📁 frontend/
│   ├── 📁 website/          ← Public-facing React SPA (6 pages)
│   │   ├── src/             ← React source code
│   │   ├── public/          ← Static assets (images, icons)
│   │   ├── dist/            ← Production build (deploy this)
│   │   ├── vite.config.js
│   │   └── package.json
│   │
│   └── 📁 admin/            ← Admin Panel React SPA (TypeScript)
│       ├── src/             ← React + TypeScript source
│       ├── public/
│       ├── vite.config.ts
│       └── package.json
│
├── 📁 backend/              ← PHP REST API (replaces Node.js)
│   ├── 📁 api/
│   │   ├── auth/            ← sign-in, sign-up, sign-out
│   │   ├── products/        ← CRUD for cable products
│   │   ├── contact/         ← Contact form
│   │   ├── account/         ← User profile & password
│   │   └── project/         ← Dashboard data
│   ├── 📁 config/
│   │   └── db.php           ← MySQL PDO connection
│   ├── 📁 helpers/
│   │   └── response.php     ← JSON helpers + CORS
│   ├── 📁 middleware/
│   │   └── auth.php         ← JWT verification
│   ├── 📁 vendor/           ← Composer packages (firebase/php-jwt)
│   ├── 📁 uploads/          ← Product image uploads
│   ├── index.php            ← API Router
│   ├── .htaccess            ← Apache rewrite rules
│   ├── .env                 ← ⚠️ DB credentials (edit before deploy)
│   ├── composer.json
│   └── public_htaccess.txt  ← Root .htaccess for public_html/
│
├── 📁 database/
│   └── flashcabcables.sql   ← MySQL schema + 12 products + admin user
│
├── 📁 docs/
│   ├── DEPLOYMENT.md        ← Hostinger deployment guide
│   └── archive/
│       └── node_server/     ← Original Node.js/MongoDB backup
│
├── 📁 scripts/
│   ├── start-dev.ps1        ← Start all dev servers (Windows)
│   └── start-dev.sh         ← Start all dev servers (Linux/Mac)
│
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- PHP 8.0+
- MySQL (XAMPP recommended)
- Node.js 18+
- Composer

### 1. Database Setup
```bash
# Import the database schema
mysql -u root flashcabcables < database/flashcabcables.sql
```

### 2. Configure Backend
```bash
# Edit backend/.env
DB_HOST=localhost
DB_NAME=flashcabcables
DB_USER=root
DB_PASS=
JWT_SECRET=your_secret_key
```

### 3. Start All Servers
```powershell
# Windows — Run the startup script:
.\scripts\start-dev.ps1
```

Or manually:
```powershell
# Terminal 1 — PHP API
cd backend
php -S localhost:8000 index.php

# Terminal 2 — Website
cd frontend/website
npm run dev

# Terminal 3 — Admin Panel
cd frontend/admin
npm start
```

### 4. Open in Browser
| App | URL |
|---|---|
| 🌐 Website | http://localhost:5173 |
| 🛠️ Admin Panel | http://localhost:5176 |
| 🐘 PHP API | http://localhost:8000/api/products |

**Admin Login:** `admin` / `password` *(change after first login!)*

---

## 🌍 Deploy to Hostinger

See the full guide: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

**Quick summary:**
1. Create MySQL DB → Import `database/flashcabcables.sql`
2. Edit `backend/.env` with Hostinger DB credentials
3. Upload `frontend/website/dist/` → `public_html/`
4. Upload `backend/` → `public_html/api/`
5. Rename `public_htaccess.txt` → `public_html/.htaccess`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/sign-in` | Public | Login |
| POST | `/api/sign-up` | Public | Register |
| GET | `/api/products` | Public | All products |
| POST | `/api/products` | 🔒 JWT | Create product |
| GET | `/api/products/:id` | Public | Single product |
| PUT | `/api/products/:id` | 🔒 JWT | Update product |
| DELETE | `/api/products/:id` | 🔒 JWT | Delete product |
| POST | `/api/contact` | Public | Contact form |
| GET | `/api/account/setting` | 🔒 JWT | User profile |
| POST | `/api/account/profile` | 🔒 JWT | Update profile |
| POST | `/api/account/password` | 🔒 JWT | Change password |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Website) | React 18, Vite, TailwindCSS, GSAP |
| Frontend (Admin) | React 18, TypeScript, Vite, TailwindCSS, Redux |
| Backend | PHP 8.2, PDO MySQL |
| Database | MySQL 5.7+ |
| Auth | JWT (firebase/php-jwt v7) |
| Hosting | Hostinger Premium Shared Hosting |

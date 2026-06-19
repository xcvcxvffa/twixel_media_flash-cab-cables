# FlashCab Cables — Hostinger Deployment Guide

## Overview

The converted project consists of:
- **PHP REST API** (`php_backend/`) — replaces Node.js/Express server
- **React Client SPA** (`client/dist/`) — public website (no changes to design)
- **React Admin SPA** (`admin/demo/`) — admin panel
- **MySQL Database** (`php_backend/database.sql`)

---

## Step 1: Set Up MySQL Database on Hostinger

1. Log into **Hostinger hPanel** → **Databases → MySQL Databases**
2. Create a new database (e.g., `u123456789_flashcab`)
3. Create a database user and set a strong password
4. Assign the user to the database with **All Privileges**
5. Note down:
   - Database host: `localhost`
   - Database name
   - Username
   - Password

6. Click **phpMyAdmin** → Select your database → Click **Import** tab
7. Choose file: `php_backend/database.sql` → Click **Go**
8. ✅ You should see: `"Users created: 1"` and `"Products created: 12"`

**Default admin login:**
- Username: `admin`
- Password: `password`
- ⚠️ **Change this immediately after first login!**

---

## Step 2: Configure PHP Backend

1. Open `php_backend/.env` and fill in your database details:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_flashcab        ← your database name
DB_USER=u123456789_flashcab_user   ← your database user
DB_PASS=your_strong_password       ← your database password
JWT_SECRET=change_this_to_a_random_long_string_2024
APP_URL=https://yourdomain.com
```

---

## Step 3: Upload Files to Hostinger

### Folder Structure to Upload in `public_html/`:

```
public_html/
│
├── .htaccess              ← RENAME public_htaccess.txt to .htaccess
│
├── index.html             ← From client/dist/index.html
├── favicon.svg            ← From client/public/favicon.svg
├── icons.svg              ← From client/public/icons.svg
│
├── assets/                ← From client/dist/assets/ (entire folder)
│
├── api/                   ← ENTIRE php_backend/ folder contents
│   ├── .htaccess
│   ├── index.php
│   ├── composer.json
│   ├── composer.lock
│   ├── .env               ← With your DB credentials filled in
│   ├── vendor/            ← Entire vendor folder (firebase/php-jwt)
│   ├── config/
│   │   └── db.php
│   ├── helpers/
│   │   └── response.php
│   ├── middleware/
│   │   └── auth.php
│   └── api/
│       ├── auth/
│       ├── products/
│       ├── contact/
│       ├── account/
│       └── project/
│
├── admin/                 ← Built admin panel
│   ├── index.html
│   └── assets/
│
├── uploads/               ← Create this folder, set chmod 755
│
└── img/                   ← Admin avatar images (from admin panel template)
    └── avatars/
        └── thumb-1.jpg    ← Placeholder avatar image
```

### Upload via File Manager or FTP:

**Option A — File Manager (Hostinger hPanel)**
1. Go to hPanel → File Manager
2. Navigate to `public_html`
3. Upload and extract files

**Option B — FTP (FileZilla recommended)**
1. hPanel → FTP Accounts → Get credentials
2. Connect with FileZilla
3. Drag and drop the files

---

## Step 4: Create Uploads Folder

In Hostinger File Manager:
1. Navigate to `public_html/`
2. Create folder: `uploads`
3. Right-click → Permissions → Set to `755`

---

## Step 5: Configure Admin Panel API URL

The admin panel (`admin/demo`) needs to be built with the correct API URL:

```bash
# In admin/demo folder:
# Edit .env file:
VITE_API_URL=https://yourdomain.com/api

# Then build:
npm run build
```

The built files go to `admin/demo/dist/` → upload to `public_html/admin/`

---

## Step 6: Rename .htaccess File

In Hostinger File Manager:
1. Find `public_html/public_htaccess.txt`
2. Rename it to `.htaccess`

---

## Step 7: Verify Deployment

Test these URLs:
- `https://yourdomain.com/` → Home page ✅
- `https://yourdomain.com/cable` → Products page ✅
- `https://yourdomain.com/cable/11kv-ht-cable` → Product detail ✅
- `https://yourdomain.com/contact` → Contact page ✅
- `https://yourdomain.com/api/products` → Returns JSON ✅
- `https://yourdomain.com/admin/` → Admin panel login ✅

---

## Troubleshooting

### "403 Forbidden" on API
- Check `api/.htaccess` exists and mod_rewrite is enabled
- Contact Hostinger support to enable `mod_rewrite`

### "500 Internal Server Error" on API
- Check `api/.env` has correct DB credentials
- Check PHP error logs in Hostinger hPanel

### Products not showing on website
- Visit `yourdomain.com/api/products` — should return JSON
- If 404, the `.htaccess` routing isn't working

### Admin can't login
- Use username: `admin`, password: `password`
- If still fails, check `api/.env` JWT_SECRET is set

### Database import fails
- Try importing in smaller chunks via phpMyAdmin
- Ensure MySQL version is 5.7+ (Hostinger Premium supports this)

---

## File Reference

| File | Purpose |
|---|---|
| `php_backend/database.sql` | MySQL schema + all 12 products + admin user |
| `php_backend/.env` | Database & JWT configuration |
| `php_backend/index.php` | PHP API router |
| `php_backend/.htaccess` | Apache URL rewriting for API |
| `php_backend/public_htaccess.txt` | Root .htaccess (rename to .htaccess) |
| `client/dist/` | Built React client website |
| `php_backend/vendor/` | PHP dependencies (firebase/php-jwt) |

# Deployment Checklist — Shared Hosting

Ikuti langkah-langkah ini setiap deploy ke shared hosting. Checklist ini mengasumsikan kamu pakai cPanel / DirectAdmin.

## 1. Pre-Deploy (Lokal)

```bash
# Build frontend assets (optimized)
pnpm run build

# Pastikan tidak ada error
php artisan config:clear
```

## 2. Upload ke Hosting

Upload SEMUA file KECUALI:
- `node_modules/`
- `.git/`
- `storage/framework/cache/data/` (dibuat ulang otomatis)
- File development seperti test, README, dll.

**PENTING:** Upload folder `public/build/` (hasil `pnpm run build`) — ini berisi assets yang di-compile Vite.

## 3. Setelah Upload — Jalankan di SSH/Terminal Hosting

```bash
# Pastikan di root folder project
cd ~/public_html  # atau folder laravel kamu

# Install dependencies PHP (tanpa dev)
composer install --optimize-autoloader --no-dev

# Set production environment
cp .env.example .env
nano .env  # Edit: APP_ENV=production, APP_DEBUG=false, APP_URL=https://domainkamu.com, DB_CONNECTION=mysql, set database credentials

# Generate APP_KEY (hanya sekali)
php artisan key:generate

# Symlink storage (hanya sekali)
php artisan storage:link

# Migrasi database (hanya sekali)
php artisan migrate --force

# Seed admin user (hanya sekali)
php artisan db:seed --class=AdminUserSeeder --force

# Cache semua config/route/view (SETIAP DEPLOY)
php artisan optimize

# Bersihkan cache lama
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

## 4. Shared Hosting Specific

### 4a. File Permissions
```bash
# Folder harus writable
chmod -R 775 storage bootstrap/cache
chmod 644 public/.htaccess public/.user.ini
```

### 4b. PHP Version
Pastikan pakai **PHP 8.3** (cek di cPanel → Select PHP Version).

### 4c. Database
- Buat database MySQL baru di cPanel
- Buat user database dengan password kuat
- Jangan pakai SQLite di production

### 4d. SSL
- Aktifkan SSL lewat cPanel (Let's Encrypt / AutoSSL)
- Uncomment HTTPS redirect di `public/.htaccess` (baris 66-70)

## 5. Verify

```bash
# Cek halaman utama
curl -I https://domainkamu.com

# Cek security headers
curl -I https://domainkamu.com | grep -i "content-security-policy\|x-frame-options\|x-content-type-options\|strict-transport"

# Cek admin panel
# Buka https://domainkamu.com/admin → harus redirect ke login
```

## 6. Post-Deploy (Opsional tapi Direkomendasikan)

- [ ] Setup backup database otomatis (cPanel → Backup Wizard)
- [ ] Setup cron job: `* * * * * php /home/user/project/artisan schedule:run >> /dev/null 2>&1`
- [ ] Tes form login admin
- [ ] Tes upload gambar di admin settings
- [ ] Tes halaman mobile responsive

## Environment Variables untuk Production

```env
APP_NAME="Aji Nur Aji Portfolio"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domainkamu.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=user_database
DB_PASSWORD=password_kuat_db

SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=strict

CACHE_STORE=file          # file lebih cepat di shared hosting
LOG_STACK=daily
LOG_LEVEL=error           # hanya log error di production
```

## Troubleshooting

| Masalah | Solusi |
|---|---|
| **500 Internal Server Error** | Cek `storage/logs/laravel.log`. Biasanya permission atau .env salah |
| **CSS/JS tidak loading** | Jalankan `pnpm run build` ulang, pastikan `public/build/` terupload |
| **Gambar tidak muncul** | Jalankan `php artisan storage:link` |
| **Login gagal** | Jalankan ulang `php artisan migrate --force` dan `php artisan db:seed --class=AdminUserSeeder` |
| **CSP memblokir resource** | Cek console browser, tambahkan domain di `app/Http/Middleware/SecurityHeaders.php` |

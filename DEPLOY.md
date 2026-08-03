# Deployment Checklist — Shared Hosting

This checklist targets cPanel, DirectAdmin, or another shared-hosting environment running Laravel.

## 1. Pre-Deploy Locally

Run from the project root:

```bash
composer install
npm install
npm run build
php artisan config:clear
php artisan route:list
```

`npm run build` runs the same Vite production build configured by the project. If pnpm is available and healthy, `pnpm run build` is also supported.

Confirm the latest frontend output exists in `public/build/`.

## 2. Upload Files

Upload the application files, including:

- `app/`
- `bootstrap/`
- `config/`
- `database/`
- `lang/`
- `public/`
- `resources/`
- `routes/`
- `storage/` structure
- `vendor/` if Composer is not available on the host
- `composer.json`, `composer.lock`, and production configuration files

Do not upload or expose:

- `.env` from another environment
- `.git/`
- `node_modules/`
- `storage/framework/cache/data/`
- Local test artifacts or editor files
- API tokens, passwords, or private credentials

The compiled frontend assets in `public/build/` must be uploaded. The server does not compile React assets at request time.

## 3. Configure Production Environment

Create or update the production `.env` on the server. Never paste real credentials into documentation or source control.

```env
APP_NAME="Aji Nur Aji Portfolio"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://example.com
APP_LOCALE=en
APP_FALLBACK_LOCALE=en

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=database_user
DB_PASSWORD=[REDACTED]

SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=strict

CACHE_STORE=file
LOG_STACK=daily
LOG_LEVEL=error
```

Use the real domain and credentials only in the server environment.

## 4. Post-Upload Commands

```bash
cd ~/public_html

composer install --optimize-autoloader --no-dev
php artisan key:generate        # only for a new installation
php artisan storage:link        # only if the link does not exist
php artisan migrate --force
php artisan optimize
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

If the server supports Node.js and the build was not uploaded, run:

```bash
npm install
npm run build
```

## 5. Bilingual Settings Verification

After signing in to `/admin/settings`:

1. Open Hero Section and enter both English and Indonesian values.
2. Open About Me and verify both Markdown editors.
3. Open Socials & Status and verify bilingual availability messages.
4. Open Navigation and verify both labels share the same Href.
5. Open SEO and verify bilingual title and description.
6. Save the settings.
7. Switch the public locale between `EN` and `ID`.
8. Confirm public copy, navigation, sidebar status, and document metadata change accordingly.

Existing single-language settings remain valid through fallback behavior.

## 6. Responsive Verification

Check these viewport behaviors after deployment:

- Desktop: admin sidebar remains visible and collapsible.
- Mobile public pages: sidebar is hidden behind a menu button.
- Mobile menu: overlay appears, body scrolling is locked, and navigation closes after selecting a link.
- Admin settings: language fields stack vertically on narrow screens.
- Admin settings: Save All Settings remains visible while scrolling the long form.

## 7. Permissions and Security

```bash
chmod -R 775 storage bootstrap/cache
chmod 644 public/.htaccess public/.user.ini
```

Ensure:

- `APP_DEBUG=false`
- HTTPS is active
- `.env` is not web-accessible
- Storage uploads are limited to expected image types
- Admin authentication and admin middleware are active
- GitHub and WakaTime tokens are stored only in server configuration/database settings

## 8. Verify the Deployment

```bash
curl -I https://example.com
curl -I https://example.com/build/manifest.json
```

Check the browser for:

- No missing JS/CSS assets
- No failed Inertia requests
- No console errors
- Working EN/ID switcher
- Working mobile menu
- Working admin settings save
- Working profile image upload

Admin should require authentication:

```text
https://example.com/admin
```

## Troubleshooting

| Problem | Check |
|---|---|
| 500 error | `storage/logs/laravel.log`, permissions, `.env`, and cache |
| CSS/JS missing | Upload `public/build/` and verify `APP_URL` |
| Locale does not change | Check session cookies, locale route, and Inertia reload |
| Editable copy stays in one language | Confirm both `*_en` and `*_id` fields were saved |
| Images missing | Run `php artisan storage:link` and check `storage` permissions |
| Login fails | Check database, migrations, session driver, and admin middleware |
| CSP blocks assets | Review `SecurityHeaders.php` and allowed production domains |
| Mobile menu does not open | Clear browser cache and inspect console errors |

## Backups and Rollback

Before deployment:

- Back up the database.
- Back up `storage/app/public`.
- Record the current release or commit identifier.

If rollback is required, restore the previous application files and assets, then clear Laravel caches:

```bash
php artisan optimize:clear
```

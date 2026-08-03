# Aji Nur Aji — Personal Website

Personal portfolio website built with Laravel, Inertia.js, React, and TypeScript. The project includes a public portfolio, an authenticated admin panel, editable site settings, bilingual English/Indonesian content, and responsive navigation.

## Features

- Public portfolio pages for home, about, skills, projects, experience, achievements, and experiments
- Laravel + Inertia.js application flow
- React 18 + TypeScript UI
- English (`en`) as the default locale with Indonesian (`id`) support
- Locale selection persisted through the Laravel session
- Bilingual editable content from Admin > Site Settings
- Locale-aware navigation labels, availability messages, WakaTime labels, and SEO metadata
- Responsive mobile sidebar with menu button, overlay, and automatic close on navigation
- Responsive admin dashboard and settings layout
- Live frontend preview from the admin header
- Profile image upload with old-file cleanup
- GitHub avatar and optional GitHub/WakaTime integrations
- Tailwind CSS 4 and shadcn-style UI primitives
- Image processing with Intervention Image

## Technology Stack

- Laravel 13
- PHP 8.3+
- React 18
- Inertia.js
- TypeScript
- Tailwind CSS 4
- Vite 8
- PostgreSQL/MySQL/SQLite-compatible Laravel database layer
- Intervention Image

## Requirements

- PHP 8.3 or newer
- Composer
- Node.js 22 or newer
- npm or pnpm
- A configured Laravel database

## Local Development

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run dev
```

Run the Laravel server and Vite development server in separate terminals:

```bash
php artisan serve
npm run dev
```

The application is then available at `http://127.0.0.1:8000`.

## Production Build

```bash
npm run build
```

The project also supports `pnpm run build` when pnpm is installed correctly. The repository's current npm fallback runs the same `vite build` script.

Build output is written to `public/build/`.

## Bilingual Site Settings

Open `/admin/settings` after signing in as an administrator. Editable copy is stored as locale-specific settings:

- `*_en` for English
- `*_id` for Indonesian

Supported bilingual content includes:

- Hero title, role, and subtitle
- Home eyebrow, location, status, intro, focus, and CTA
- About title, intro, and Markdown description
- Skills title and subtitle
- Availability badge messages
- Navigation labels
- WakaTime chart labels
- SEO title and description

Technical values such as URLs, email addresses, image paths, tokens, social platforms, embed URLs, and Google verification codes remain shared values.

If a locale-specific value is empty, the public site falls back to the legacy setting or the English default.

## Admin Panel

Admin routes are protected by the application's authentication and admin middleware. Main sections include:

- Dashboard
- Projects
- Skills
- Achievements
- Experience
- Site Settings

The desktop admin panel uses a collapsible sidebar. Public mobile navigation uses a dedicated menu button and overlay so the sidebar does not consume the full mobile viewport.

## Deployment Summary

See [DEPLOY.md](DEPLOY.md) for the shared-hosting deployment checklist.

At minimum:

```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
php artisan migrate --force
php artisan storage:link
php artisan optimize
```

Do not commit `.env`, credentials, API tokens, or production connection strings.

## Documentation

- [Deployment checklist](DEPLOY.md)
- [Changelog](CHANGELOG.md)
- [Project instructions](AGENTS.md)

## License

This repository is maintained as a personal portfolio project. Contact the owner before reusing branding, personal content, or uploaded assets.

## Author

Aji Nur Aji

- GitHub: [AjiNurAji](https://github.com/AjiNurAji)
- Portfolio: configured through the deployed application URL

> Keep personal credentials and private integration tokens outside the repository.

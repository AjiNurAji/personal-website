# Changelog

All notable changes to this project are documented here.

The project follows a Keep a Changelog-style format. Dates reflect the local development history and are not a substitute for release tags.

## [Unreleased]

### Added

- Laravel-backed locale switching with English (`en`) as the default and Indonesian (`id`) support.
- Session-persisted locale selection through `POST /locale/{locale}`.
- Inertia-shared locale and translation catalog data.
- Bilingual Admin > Site Settings fields for hero, home, about, skills, availability, navigation, WakaTime labels, and SEO metadata.
- Locale-aware public settings resolution with backwards-compatible fallback to legacy single-language settings.
- Mobile public navigation with a menu button, overlay, close action, scroll lock, and automatic close after navigation.
- Responsive admin settings layout with sticky section navigation and a sticky save action.

### Changed

- Public navigation, sidebar copy, home content, about content, status messages, and page metadata now follow the active locale.
- Admin settings now display English and Indonesian inputs side by side on desktop and stacked on mobile.
- Navigation Hrefs and technical integration values remain shared between locales.
- Admin dashboard statistics now use real metrics only; the placeholder admin-session metric was removed.
- Admin dashboard colors now use semantic shadcn theme tokens instead of hardcoded color families.
- Documentation now reflects the current bilingual settings architecture, mobile navigation, build workflow, and deployment process.

### Fixed

- Locale changes no longer leave stale Inertia page props visible.
- Long admin settings forms no longer hide the Save All Settings action below the viewport.
- Public settings cache keys are separated by locale and invalidated after settings updates.

## [1.2.0] - 2026-06-24

### Added

- Profile image upload from Admin Settings with cleanup of the previous local image.
- Global live preview modal in the admin layout.
- Responsive preview toggles for desktop, tablet, and mobile.
- Skill icon picker using Simple Icons.

### Changed

- Skill and experience ordering follows ascending priority.
- Admin Skills table displays the rendered icon beside its priority.
- Public skill icon rendering uses the saved Simple Icons slug.
- Portfolio visual language and section layout were refined for a consistent dark portfolio experience.

### Fixed

- Live Preview modal close-button alignment.

---

Older changes remain available in Git history.

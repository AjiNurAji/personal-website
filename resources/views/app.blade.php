@php
    $siteTitle = \App\Models\Setting::getValue('site_title', 'Aji Nur Aji — Fullstack Developer');
    $siteDesc  = \App\Models\Setting::getValue('site_description', 'Fullstack Developer & Networking Enthusiast. Building modern web apps with Laravel, React, TypeScript, and Node.js.');
    $shortDesc = \Illuminate\Support\Str::limit($siteDesc, 158, '');
    $twitter   = \App\Models\Setting::getValue('twitter_username', '');
    $canonical = url()->current();
    $ogImage   = url('/og-image');

    $jsonLd = json_encode([
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'WebSite',
                'name' => $siteTitle,
                'url' => url('/'),
                'description' => \Illuminate\Support\Str::limit($siteDesc, 200, ''),
            ],
            [
                '@type' => 'Person',
                'name' => 'Aji Nur Aji',
                'jobTitle' => 'Fullstack Developer',
                'url' => url('/'),
            ],
        ],
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
@endphp
<!DOCTYPE html>
<html lang="id" translate="no">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google" content="notranslate">
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0f">
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafafa">
        <meta name="google-site-verification" content="{{ \App\Models\Setting::getValue('google_site_verification', '') }}">

        <!-- Primary Meta Tags -->
        <title inertia>{{ $siteTitle }}</title>
        <meta name="title" content="{{ $siteTitle }}">
        <meta name="description" content="{{ $shortDesc }}">
        <meta name="author" content="Aji Nur Aji">
        <meta name="keywords" content="Aji Nur Aji, Fullstack Developer, Web Development, Laravel, React, portfolio, developer, JavaScript, PHP, TypeScript, Indonesia">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ $canonical }}">
        <meta property="og:title" content="{{ $siteTitle }}">
        <meta property="og:description" content="{{ $siteDesc }}">
        <meta property="og:image" content="{{ $ogImage }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="{{ $siteTitle }}">
        <meta property="og:locale" content="id_ID">

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ $canonical }}">
        <meta name="twitter:title" content="{{ $siteTitle }}">
        <meta name="twitter:description" content="{{ $siteDesc }}">
        <meta name="twitter:image" content="{{ $ogImage }}">
        @if ($twitter)
            <meta name="twitter:site" content="{{ '@' . $twitter }}">
        @endif

        <!-- Canonical -->
        <link rel="canonical" href="{{ $canonical }}">

        <!-- Favicon & Icons -->
        <link rel="icon" type="image/svg+xml" href="{{ asset('ana.svg') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">

        <!-- Web App Manifest -->
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">

        <!-- JSON-LD Structured Data -->
        <script type="application/ld+json">{!! $jsonLd !!}</script>

        <!-- Preconnect for performance -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <!-- Google Fonts — async to unblock render -->
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap" media="print" onload="this.media='all'">
        <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap">
        </noscript>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(["resources/js/app.tsx", "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <h1 class="sr-only">{{ $siteTitle }}</h1>
        @inertia
    </body>
</html>

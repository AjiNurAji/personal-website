<!DOCTYPE html>
<html lang="en" translate="no">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google" content="notranslate">
        
        <!-- Primary Meta Tags -->
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="title" content="{{ config('app.name', 'Aji Nur Aji - Fullstack Developer Portfolio') }}">
        <meta name="description" content="Portfolio of Aji Nur Aji, a passionate Fullstack Developer specializing in building modern web applications with Laravel, React, and Node.js.">
        <meta name="author" content="Aji Nur Aji">
        <meta name="keywords" content="Aji Nur Aji, Fullstack Developer, Web Development, Laravel, React, portfolio, developer, JavaScript, PHP">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'Aji Nur Aji - Fullstack Developer Portfolio') }}">
        <meta property="og:description" content="Explore my projects, skills, and professional journey in web development.">
        <meta property="og:image" content="{{ asset('ana.svg') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ config('app.name', 'Aji Nur Aji - Fullstack Developer Portfolio') }}">
        <meta property="twitter:description" content="Explore my projects, skills, and professional journey in web development.">
        <meta property="twitter:image" content="{{ asset('ana.svg') }}">

        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="{{ asset('ana.svg') }}">

        <!-- Google Fonts (Outfit) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

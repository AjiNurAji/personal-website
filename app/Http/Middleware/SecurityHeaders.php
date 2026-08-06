<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): mixed
    {
        $response = $next($request);

        if ($response instanceof Response || method_exists($response, 'header')) {
            // Strict Transport Security (HSTS) — only if HTTPS
            if ($request->secure()) {
                $response->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            }

            // Prevent MIME type sniffing
            $response->header('X-Content-Type-Options', 'nosniff');

            // Prevent clickjacking
            $response->header('X-Frame-Options', 'SAMEORIGIN');

            // Control referrer information
            $response->header('Referrer-Policy', 'strict-origin-when-cross-origin');

            // Permissions Policy — block unnecessary APIs
            $response->header(
                'Permissions-Policy',
                'camera=(), microphone=(), geolocation=(), interest-cohort=()'
            );

            $scriptSrc = "'self' 'unsafe-inline' https://cdn.credly.com https://static.cloudflareinsights.com";
            if (app()->environment('local')) {
                $scriptSrc .= " 'unsafe-eval'";
            }
            $connectSrc = "'self' https://api.github.com https://wakatime.com";

            if (app()->environment('local')) {
                $scriptSrc .= " http://localhost:5173 http://127.0.0.1:5173";

                $connectSrc .= " http://localhost:5173 http://127.0.0.1:5173";
                $connectSrc .= " ws://localhost:5173 ws://127.0.0.1:5173";
            }

            $csp = implode('; ', [
                "default-src 'self'",
                "script-src {$scriptSrc}",
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
                "img-src 'self' data: https: blob:",
                "font-src 'self' fonts.gstatic.com",
                "connect-src {$connectSrc}",
                "frame-src 'self' https://www.credly.com https://*.credly.com",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'self'",
                app()->environment('production') ? "upgrade-insecure-requests" : null,
            ]);

            $response->header('Content-Security-Policy', $csp);
        }

        return $response;
    }
}

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

            // Content Security Policy
            $csp = implode('; ', array_filter([
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
                "img-src 'self' data: https: blob:",
                "font-src 'self' fonts.gstatic.com",
                "connect-src 'self' https://api.github.com",
                "frame-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
                "frame-ancestors 'self'",
                "upgrade-insecure-requests",
            ]));

            $response->header('Content-Security-Policy', $csp);
        }

        return $response;
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $adminEmail = (string) config('app.admin_email', env('ADMIN_EMAIL', ''));
        $user = $request->user();

        abort_unless($user && $adminEmail !== '' && hash_equals(strtolower($adminEmail), strtolower((string) $user->email)), 403);

        return $next($request);
    }
}

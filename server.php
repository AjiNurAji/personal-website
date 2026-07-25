<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

// Normalize path separators for Windows
$filePath = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, __DIR__.'/public'.$uri);

error_log("DEBUG URI: " . $uri);
error_log("DEBUG FILEPATH: " . $filePath);
error_log("DEBUG EXISTS: " . (file_exists($filePath) ? 'YES' : 'NO'));

if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

require_once __DIR__.'/public/index.php';

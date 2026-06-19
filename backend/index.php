<?php
/**
 * FlashCab Cables — PHP API Router
 * 
 * All /api/* requests are routed here by .htaccess.
 * This file dispatches to the correct handler based on URI.
 */

// If using PHP built-in server and file exists, serve it directly
if (php_sapi_name() === 'cli-server') {
    $urlPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = realpath(__DIR__ . $urlPath);
    if ($path && is_file($path)) {
        header("Access-Control-Allow-Origin: *");
        $mime = @mime_content_type($path);
        if (!$mime) {
            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            $mimeMap = ['png' => 'image/png', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'gif' => 'image/gif', 'svg' => 'image/svg+xml', 'webp' => 'image/webp', 'ico' => 'image/x-icon'];
            $mime = $mimeMap[$ext] ?? 'application/octet-stream';
        }
        header("Content-Type: $mime");
        header("Content-Length: " . filesize($path));
        readfile($path);
        exit;
    }
}

// Load helpers first (sets CORS headers)
require_once __DIR__ . '/helpers/response.php';

setCorsHeaders();
handlePreflight();

// Parse the request URI
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';

// Strip query string
$uri = strtok($requestUri, '?');
$uri = rtrim($uri, '/');

// Normalize — remove /api prefix if present
$uri = preg_replace('#^/api#', '', $uri);
if (empty($uri)) $uri = '/';

// ─── Route Dispatch ───────────────────────────────────────────────────────────

// AUTH routes
if ($uri === '/sign-in')          { require __DIR__ . '/api/auth/sign-in.php';         exit; }
if ($uri === '/sign-up')          { require __DIR__ . '/api/auth/sign-up.php';         exit; }
if ($uri === '/sign-out')         { require __DIR__ . '/api/auth/sign-out.php';        exit; }
if ($uri === '/forgot-password')  { require __DIR__ . '/api/auth/forgot-password.php'; exit; }
if ($uri === '/reset-password')   { require __DIR__ . '/api/auth/reset-password.php';  exit; }

// CONTACT routes
if ($uri === '/contact')          { require __DIR__ . '/api/contact/index.php';        exit; }
if ($uri === '/contacts')         { require __DIR__ . '/api/contacts/index.php';       exit; }

// SETTINGS route
if ($uri === '/settings')         { require __DIR__ . '/api/settings/index.php';       exit; }

// PAGE SETTINGS routes
if ($uri === '/page-settings' || $uri === '/page-settings/') {
    require __DIR__ . '/api/page-settings/index.php';
    exit;
}
if (preg_match('/^\/page-settings\/([a-zA-Z0-9_-]+)$/', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/api/page-settings/single.php';
    exit;
}

// ANALYTICS routes
if ($uri === '/analytics/track' || $uri === '/analytics/track/') {
    require __DIR__ . '/api/analytics/track.php';
    exit;
}
if ($uri === '/analytics/stats' || $uri === '/analytics/stats/') {
    require __DIR__ . '/api/analytics/stats.php';
    exit;
}

// BLOGS routes
if ($uri === '/blogs' || $uri === '/blogs/') {
    require __DIR__ . '/api/blogs/index.php';
    exit;
}

if (preg_match('#^/blogs/([^/]+)$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/api/blogs/single.php';
    exit;
}

// UPLOAD route
if ($uri === '/upload')           { require __DIR__ . '/api/upload/index.php';         exit; }

// PROJECT route
if ($uri === '/project/dashboard') { require __DIR__ . '/api/project/dashboard.php'; exit; }

// ACCOUNT routes
if ($uri === '/account/setting')  { require __DIR__ . '/api/account/setting.php';  exit; }
if ($uri === '/account/profile')  { require __DIR__ . '/api/account/profile.php';  exit; }
if ($uri === '/account/password') { require __DIR__ . '/api/account/password.php'; exit; }

// NOTIFICATIONS (stub for admin panel)
if ($uri === '/notification/count') { jsonSuccess(['count' => 0]); }
if ($uri === '/notification/list')  { jsonSuccess([]); }

// PRODUCTS routes
if ($uri === '/products' || $uri === '/products/') {
    require __DIR__ . '/api/products/index.php';
    exit;
}

// /products/{id} — capture the id segment
if (preg_match('#^/products/([^/]+)$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/api/products/single.php';
    exit;
}

// ─── 404 ─────────────────────────────────────────────────────────────────────
jsonError("API endpoint not found: $uri", 404);

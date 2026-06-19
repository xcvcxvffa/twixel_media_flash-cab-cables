<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $body = getJsonBody();
    
    // Some simple bot protection
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    if (preg_match('/bot|crawl|slurp|spider|mediapartners/i', $userAgent)) {
        jsonSuccess(['message' => 'Ignored bot']);
    }

    $page_url = $body['page_url'] ?? '';
    $page_title = $body['page_title'] ?? '';
    $referrer = $body['referrer'] ?? '';
    $device_type = $body['device_type'] ?? 'Desktop';
    $browser = $body['browser'] ?? 'Unknown';
    $session_id = $body['session_id'] ?? '';
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';

    // Anonymize IP (Basic)
    if ($ip_address && strpos($ip_address, '.') !== false) {
        $parts = explode('.', $ip_address);
        $parts[3] = '0';
        $ip_address = implode('.', $parts);
    }

    if (empty($page_url)) {
        jsonError('Page URL is required', 400);
    }

    try {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare('INSERT INTO page_views (session_id, page_url, page_title, referrer, device_type, browser, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$session_id, $page_url, $page_title, $referrer, $device_type, $browser, $ip_address]);
        jsonSuccess(['message' => 'Tracked']);
    } catch (PDOException $e) {
        // Silently fail for tracking to not break frontend
        jsonError('DB Error', 500);
    }
}

jsonError('Method not allowed', 405);

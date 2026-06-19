<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../helpers/response.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function getJwtSecret(): string {
    return getenv('JWT_SECRET') ?: 'fallback_secret_key_12345';
}

function generateToken(int $userId): string {
    $payload = [
        'id'  => $userId,
        'iat' => time(),
        'exp' => time() + (30 * 24 * 60 * 60), // 30 days
    ];
    return JWT::encode($payload, getJwtSecret(), 'HS256');
}

/**
 * Verifies the Bearer token from Authorization header.
 * Returns the decoded user ID or sends a 401 and exits.
 */
function requireAuth(): int {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (empty($authHeader) && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? '';
    }

    if (!str_starts_with($authHeader, 'Bearer ')) {
        jsonError('Not authorized, no token', 401);
    }

    $token = substr($authHeader, 7);
    try {
        $decoded = JWT::decode($token, new Key(getJwtSecret(), 'HS256'));
        return (int)$decoded->id;
    } catch (Exception $e) {
        jsonError('Not authorized, token failed', 401);
    }
}

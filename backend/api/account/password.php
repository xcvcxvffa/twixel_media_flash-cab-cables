<?php
/**
 * POST /api/account/password
 * Update authenticated user's password
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$userId = requireAuth();
$body   = getJsonBody();

$currentPassword = $body['password']    ?? '';
$newPassword     = $body['newPassword'] ?? '';

if (empty($currentPassword) || empty($newPassword)) {
    jsonError('Current and new password are required', 400);
}

try {
    $pdo  = Database::getConnection();
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonError('User not found', 404);
    }

    if (!password_verify($currentPassword, $user['password'])) {
        jsonError('Incorrect current password', 400);
    }

    $hashed = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 10]);

    $stmt = $pdo->prepare('UPDATE users SET password=?, updatedAt=NOW() WHERE id=?');
    $stmt->execute([$hashed, $userId]);

    jsonSuccess(['message' => 'Password updated successfully']);
} catch (PDOException $e) {
    jsonError('Server error updating password', 500);
}

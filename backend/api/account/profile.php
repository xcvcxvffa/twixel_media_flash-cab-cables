<?php
/**
 * POST /api/account/profile
 * Update authenticated user's profile
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

try {
    $pdo  = Database::getConnection();
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonError('User not found', 404);
    }

    $name     = $body['name']     ?? $user['userName'];
    $email    = $body['email']    ?? $user['email'];
    $title    = $body['title']    ?? $user['title'];
    $avatar   = $body['avatar']   ?? $user['avatar'];
    $timeZone = $body['timeZone'] ?? $user['timeZone'];
    $lang     = $body['lang']     ?? $user['lang'];
    $syncData = isset($body['syncData']) ? (int)(bool)$body['syncData'] : (int)$user['syncData'];

    $stmt = $pdo->prepare(
        'UPDATE users SET userName=?, email=?, title=?, avatar=?, timeZone=?, lang=?, syncData=?, updatedAt=NOW()
         WHERE id=?'
    );
    $stmt->execute([$name, $email, $title, $avatar, $timeZone, $lang, $syncData, $userId]);

    jsonSuccess([
        'name'     => $name,
        'email'    => $email,
        'title'    => $title,
        'avatar'   => $avatar,
        'timeZone' => $timeZone,
        'lang'     => $lang,
        'syncData' => (bool)$syncData,
    ]);
} catch (PDOException $e) {
    jsonError('Server error updating profile', 500);
}

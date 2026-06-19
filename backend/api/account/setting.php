<?php
/**
 * GET /api/account/setting
 * Returns the authenticated user's profile and mock login history
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

$userId = requireAuth();

try {
    $pdo  = Database::getConnection();
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonError('User not found', 404);
    }

    jsonSuccess([
        'profile' => [
            'name'     => $user['userName'],
            'email'    => $user['email'],
            'title'    => $user['title']    ?? '',
            'avatar'   => $user['avatar'],
            'timeZone' => $user['timeZone'] ?? 'GMT+8',
            'lang'     => $user['lang']     ?? 'en',
            'syncData' => (bool)$user['syncData'],
        ],
        'loginHistory' => [
            [
                'type'       => 'Desktop',
                'deviceName' => 'Current Session',
                'time'       => time(),
                'location'   => 'Server',
            ],
        ],
    ]);
} catch (PDOException $e) {
    jsonError('Server error', 500);
}

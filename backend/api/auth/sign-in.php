<?php
/**
 * POST /api/sign-in
 * Authenticate user and return JWT token
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$body     = getJsonBody();
$userName = trim($body['userName'] ?? '');
$password = $body['password'] ?? '';

if (empty($userName) || empty($password)) {
    jsonError('Username and password are required', 400);
}

try {
    $pdo  = Database::getConnection();
    $stmt = $pdo->prepare('SELECT * FROM users WHERE userName = ? LIMIT 1');
    $stmt->execute([$userName]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonError('Invalid username or password', 401);
    }

    $authority = json_decode($user['authority'], true) ?? ['admin', 'user'];

    jsonSuccess([
        'user' => [
            'userName'  => $user['userName'],
            'email'     => $user['email'],
            'authority' => $authority,
            'avatar'    => $user['avatar'],
        ],
        'token' => generateToken((int)$user['id']),
    ]);

} catch (PDOException $e) {
    jsonError('Server error', 500);
}

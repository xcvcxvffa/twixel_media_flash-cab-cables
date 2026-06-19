<?php
/**
 * POST /api/sign-up
 * Register a new user
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
$email    = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if (empty($userName) || empty($email) || empty($password)) {
    jsonError('All fields are required', 400);
}

try {
    $pdo = Database::getConnection();

    // Check if user already exists
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? OR userName = ? LIMIT 1');
    $stmt->execute([$email, $userName]);
    if ($stmt->fetch()) {
        jsonError('User already exists', 400);
    }

    $hashed    = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
    $authority = json_encode(['admin', 'user']);
    $avatar    = '/img/avatars/thumb-1.jpg';

    $stmt = $pdo->prepare(
        'INSERT INTO users (userName, email, password, authority, avatar) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([$userName, $email, $hashed, $authority, $avatar]);
    $newId = (int)$pdo->lastInsertId();

    jsonSuccess([
        'user' => [
            'userName'  => $userName,
            'email'     => $email,
            'authority' => ['admin', 'user'],
            'avatar'    => $avatar,
        ],
        'token' => generateToken($newId),
    ], 201);

} catch (PDOException $e) {
    jsonError('Server error', 500);
}

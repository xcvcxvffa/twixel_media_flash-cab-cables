<?php
/**
 * POST /api/contact
 * Save a contact form submission
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$body      = getJsonBody();
$firstName = trim($body['firstName'] ?? '');
$lastName  = trim($body['lastName']  ?? '');
$email     = trim($body['email']     ?? '');
$message   = trim($body['message']   ?? '');

if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    jsonError('All fields are required', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonError('Invalid email address', 400);
}

try {
    $pdo  = Database::getConnection();
    $stmt = $pdo->prepare(
        'INSERT INTO contacts (firstName, lastName, email, message) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$firstName, $lastName, $email, $message]);
    $newId = (int)$pdo->lastInsertId();

    $stmt = $pdo->prepare('SELECT * FROM contacts WHERE id = ? LIMIT 1');
    $stmt->execute([$newId]);
    $contact = $stmt->fetch();

    jsonSuccess([
        '_id'       => (string)$contact['id'],
        'id'        => (string)$contact['id'],
        'firstName' => $contact['firstName'],
        'lastName'  => $contact['lastName'],
        'email'     => $contact['email'],
        'message'   => $contact['message'],
        'createdAt' => $contact['createdAt'],
        'updatedAt' => $contact['createdAt'],
    ], 201);

} catch (PDOException $e) {
    jsonError('Server error', 500);
}

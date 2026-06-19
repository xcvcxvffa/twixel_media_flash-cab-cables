<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null; // this is the slug or ID

if (!$id) {
    jsonError('Page ID or Slug is required', 400);
}

try {
    $pdo = Database::getConnection();

    if ($method === 'GET') {
        // Can fetch by ID or Slug
        $stmt = $pdo->prepare('SELECT * FROM page_settings WHERE id = ? OR slug = ? LIMIT 1');
        $stmt->execute([$id, $id]);
        $page = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$page) {
            jsonError('Page not found', 404);
        }

        if (!empty($page['other_settings'])) {
            $page['other_settings'] = json_decode($page['other_settings'], true);
        }

        jsonSuccess(['data' => $page]);
    }

    if ($method === 'PUT' || $method === 'POST') {
        requireAuth();

        $body = getJsonBody();
        if (empty($body)) {
            jsonError('Invalid data', 400);
        }

        // We only allow updating meta fields and other_settings
        $meta_title = $body['meta_title'] ?? null;
        $meta_description = $body['meta_description'] ?? null;
        $meta_keywords = $body['meta_keywords'] ?? null;
        $other_settings = isset($body['other_settings']) ? json_encode($body['other_settings']) : null;

        $stmt = $pdo->prepare('UPDATE page_settings SET meta_title = ?, meta_description = ?, meta_keywords = ?, other_settings = ? WHERE id = ? OR slug = ?');
        $stmt->execute([$meta_title, $meta_description, $meta_keywords, $other_settings, $id, $id]);

        jsonSuccess(['message' => 'Page settings updated successfully']);
    }

    jsonError('Method not allowed', 405);

} catch (PDOException $e) {
    jsonError('Server error: ' . $e->getMessage(), 500);
}

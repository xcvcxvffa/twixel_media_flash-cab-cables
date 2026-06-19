<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->query('SELECT * FROM page_settings ORDER BY id ASC');
        $pages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($pages as &$page) {
            if (!empty($page['other_settings'])) {
                $page['other_settings'] = json_decode($page['other_settings'], true);
            }
        }

        jsonSuccess(['data' => $pages]);
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

jsonError('Method not allowed', 405);

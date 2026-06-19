<?php
/**
 * /api/settings
 *   GET  — Get all site settings (public)
 *   PUT — Update site settings (protected)
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

// ─── GET all settings ────────────────────────────────────────────────────────
if ($method === 'GET') {
    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->query('SELECT setting_key, setting_value FROM settings');
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }

        jsonSuccess($settings);
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

// ─── PUT update settings ─────────────────────────────────────────────────────
if ($method === 'PUT' || $method === 'POST') {
    requireAuth();

    $body = getJsonBody();

    if (empty($body) || !is_array($body)) {
        jsonError('Invalid settings data', 400);
    }

    try {
        $pdo = Database::getConnection();
        $pdo->beginTransaction();

        $stmt = $pdo->prepare('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)');
        
        foreach ($body as $key => $value) {
            // Ensure key is a string and value is stringifiable
            if (is_string($key)) {
                $valStr = is_array($value) ? json_encode($value) : (string)$value;
                $stmt->execute([$key, $valStr]);
            }
        }

        $pdo->commit();

        jsonSuccess(['message' => 'Settings updated successfully']);
    } catch (PDOException $e) {
        $pdo->rollBack();
        jsonError('Failed to update settings', 500);
    }
}

jsonError('Method not allowed', 405);

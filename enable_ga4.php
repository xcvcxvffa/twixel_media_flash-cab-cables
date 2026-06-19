<?php
require_once __DIR__ . '/backend/config/db.php';

try {
    $pdo = Database::getConnection();
    $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES ('ga4_enabled', '1') ON DUPLICATE KEY UPDATE setting_value = '1'");
    $stmt->execute();
    echo "GA4 Enabled successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

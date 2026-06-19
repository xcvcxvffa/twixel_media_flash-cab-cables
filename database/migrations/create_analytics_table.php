<?php
require 'backend/config/db.php';

try {
    $pdo = Database::getConnection();
    
    $sql = "CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(255),
        page_url VARCHAR(255) NOT NULL,
        page_title VARCHAR(255),
        referrer VARCHAR(255),
        device_type VARCHAR(50),
        browser VARCHAR(50),
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    $pdo->exec($sql);
    echo "Table 'page_views' created successfully.\n";

} catch (PDOException $e) {
    die("Error creating table: " . $e->getMessage() . "\n");
}
?>

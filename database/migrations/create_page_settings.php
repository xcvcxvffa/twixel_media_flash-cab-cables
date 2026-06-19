<?php
require 'backend/config/db.php';

try {
    $pdo = Database::getConnection();
    
    $sql = "CREATE TABLE IF NOT EXISTS page_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords TEXT,
        other_settings JSON,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "page_settings table created successfully.\n";

    // Seed default pages
    $pages = [
        ['Home', 'home'],
        ['About Us', 'about'],
        ['Products', 'products'],
        ['Blogs', 'blogs'],
        ['Contact Us', 'contact']
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO page_settings (page_name, slug) VALUES (?, ?)");
    foreach ($pages as $page) {
        $stmt->execute($page);
    }
    echo "Default pages seeded successfully.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

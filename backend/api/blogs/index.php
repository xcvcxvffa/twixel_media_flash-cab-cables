<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // GET all blogs
    try {
        $pdo = Database::getConnection();
        
        $sql = "SELECT * FROM blogs";
        $params = [];
        
        if (isset($_GET['status'])) {
            $sql .= " WHERE status = ?";
            $params[] = $_GET['status'];
        }
        
        $sql .= " ORDER BY created_at DESC";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $blogs = $stmt->fetchAll();
        
        jsonSuccess($blogs);
    } catch (PDOException $e) {
        jsonError('Failed to fetch blogs', 500);
    }
} elseif ($method === 'POST') {
    // Auth required to create blog
    requireAuth();
    
    $body = getJsonBody();
    
    $title            = $body['title'] ?? '';
    $slug             = $body['slug'] ?? '';
    $excerpt          = $body['excerpt'] ?? '';
    $content          = $body['content'] ?? '';
    $image            = $body['image'] ?? '';
    $category         = $body['category'] ?? '';
    $status           = $body['status'] ?? 'draft';
    $meta_title       = $body['meta_title'] ?? null;
    $meta_description = $body['meta_description'] ?? null;
    $meta_keywords    = $body['meta_keywords'] ?? null;
    
    if (!$title || !$slug) {
        jsonError('Title and slug are required', 400);
    }
    
    try {
        $pdo = Database::getConnection();
        
        // Check if slug exists
        $stmt = $pdo->prepare("SELECT id FROM blogs WHERE slug = ?");
        $stmt->execute([$slug]);
        if ($stmt->fetch()) {
            jsonError('Slug already exists', 400);
        }
        
        $stmt = $pdo->prepare("INSERT INTO blogs (title, slug, excerpt, content, image, category, status, meta_title, meta_description, meta_keywords, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$title, $slug, $excerpt, $content, $image, $category, $status, $meta_title, $meta_description, $meta_keywords]);
        
        $id = $pdo->lastInsertId();
        
        jsonSuccess([
            'id' => $id,
            'title' => $title,
            'slug' => $slug,
            'status' => $status
        ]);
    } catch (PDOException $e) {
        jsonError('Failed to create blog: ' . $e->getMessage(), 500);
    }
} else {
    jsonError('Method not allowed', 405);
}

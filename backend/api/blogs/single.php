<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];
$idOrSlug = $_GET['id'] ?? null;

if (!$idOrSlug) {
    jsonError('Blog ID or Slug is required', 400);
}

// Helper to find blog
function getBlog($pdo, $idOrSlug) {
    $field = is_numeric($idOrSlug) ? 'id' : 'slug';
    $stmt = $pdo->prepare("SELECT * FROM blogs WHERE $field = ?");
    $stmt->execute([$idOrSlug]);
    return $stmt->fetch();
}

if ($method === 'GET') {
    try {
        $pdo = Database::getConnection();
        $blog = getBlog($pdo, $idOrSlug);
        
        if (!$blog) {
            jsonError('Blog not found', 404);
        }
        
        jsonSuccess($blog);
    } catch (PDOException $e) {
        jsonError('Failed to fetch blog', 500);
    }
} elseif ($method === 'PUT') {
    // Auth required to update blog
    requireAuth();
    
    $body = getJsonBody();
    
    try {
        $pdo = Database::getConnection();
        $blog = getBlog($pdo, $idOrSlug);
        
        if (!$blog) {
            jsonError('Blog not found', 404);
        }
        
        $title            = $body['title'] ?? $blog['title'];
        $slug             = $body['slug'] ?? $blog['slug'];
        $excerpt          = isset($body['excerpt']) ? $body['excerpt'] : $blog['excerpt'];
        $content          = $body['content'] ?? $blog['content'];
        $image            = $body['image'] ?? $blog['image'];
        $category         = $body['category'] ?? $blog['category'];
        $status           = $body['status'] ?? $blog['status'];
        $meta_title       = isset($body['meta_title']) ? $body['meta_title'] : $blog['meta_title'];
        $meta_description = isset($body['meta_description']) ? $body['meta_description'] : $blog['meta_description'];
        $meta_keywords    = isset($body['meta_keywords']) ? $body['meta_keywords'] : $blog['meta_keywords'];
        
        // Check if new slug conflicts with another blog
        if ($slug !== $blog['slug']) {
            $stmt = $pdo->prepare("SELECT id FROM blogs WHERE slug = ? AND id != ?");
            $stmt->execute([$slug, $blog['id']]);
            if ($stmt->fetch()) {
                jsonError('Slug already exists', 400);
            }
        }
        
        $stmt = $pdo->prepare("UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, image = ?, category = ?, status = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$title, $slug, $excerpt, $content, $image, $category, $status, $meta_title, $meta_description, $meta_keywords, $blog['id']]);
        
        jsonSuccess([
            'id' => $blog['id'],
            'title' => $title,
            'slug' => $slug,
            'status' => $status
        ]);
    } catch (PDOException $e) {
        jsonError('Failed to update blog: ' . $e->getMessage(), 500);
    }
} elseif ($method === 'DELETE') {
    // Auth required to delete blog
    requireAuth();
    
    try {
        $pdo = Database::getConnection();
        $blog = getBlog($pdo, $idOrSlug);
        
        if (!$blog) {
            jsonError('Blog not found', 404);
        }
        
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$blog['id']]);
        
        jsonSuccess(['message' => 'Blog deleted successfully']);
    } catch (PDOException $e) {
        jsonError('Failed to delete blog', 500);
    }
} else {
    jsonError('Method not allowed', 405);
}

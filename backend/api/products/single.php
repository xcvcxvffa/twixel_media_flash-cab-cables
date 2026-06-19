<?php
/**
 * /api/products/{id}
 *   GET    — Get single product by ID or slug (public)
 *   PUT    — Update product (protected)
 *   DELETE — Delete product (protected)
 *
 * The product ID is passed via query string: ?id=123
 * (Set by .htaccess rewrite rule)
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method    = $_SERVER['REQUEST_METHOD'];
$productId = $_GET['id'] ?? '';

if (empty($productId)) {
    jsonError('Product ID required', 400);
}

// ─── GET single product ───────────────────────────────────────────────────────
if ($method === 'GET') {
    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ? OR slug = ? LIMIT 1');
        $stmt->execute([$productId, $productId]);
        $row = $stmt->fetch();

        if (!$row) {
            jsonError('Product not found', 404);
        }

        jsonSuccess(formatProduct($row));
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

// ─── PUT update product ───────────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();

    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ? OR slug = ? LIMIT 1');
        $stmt->execute([$productId, $productId]);
        $existing = $stmt->fetch();

        if (!$existing) {
            jsonError('Product not found', 404);
        }

        $body = getJsonBody();

        $name              = $body['name']              ?? $existing['name'];
        $slug              = $body['slug']              ?? $existing['slug'];
        $description       = $body['description']       ?? $existing['description'];
        $specificationHtml = $body['specificationHtml'] ?? $existing['specificationHtml'];
        $status            = isset($body['status'])     ? (int)$body['status'] : (int)$existing['status'];

        $imgList          = isset($body['imgList'])          ? json_encode($body['imgList'])          : $existing['imgList'];
        $applications     = isset($body['applications'])     ? json_encode($body['applications'])     : $existing['applications'];
        $technicalDetails = isset($body['technicalDetails']) ? json_encode($body['technicalDetails']) : $existing['technicalDetails'];
        $features         = isset($body['features'])         ? json_encode($body['features'])         : $existing['features'];

        $stmt = $pdo->prepare(
            'UPDATE products SET
               name = ?, slug = ?, description = ?,
               imgList = ?, applications = ?, technicalDetails = ?, features = ?,
               specificationHtml = ?, status = ?,
               updatedAt = NOW()
             WHERE id = ?'
        );
        $stmt->execute([
            $name, $slug, $description,
            $imgList, $applications, $technicalDetails, $features,
            $specificationHtml, $status,
            (int)$existing['id'],
        ]);

        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([(int)$existing['id']]);
        $updated = $stmt->fetch();

        jsonSuccess(formatProduct($updated));
    } catch (PDOException $e) {
        jsonError('Invalid product data: ' . $e->getMessage(), 400);
    }
}

// ─── DELETE product ───────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();

    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->prepare('SELECT id FROM products WHERE id = ? OR slug = ? LIMIT 1');
        $stmt->execute([$productId, $productId]);
        $existing = $stmt->fetch();

        if (!$existing) {
            jsonError('Product not found', 404);
        }

        $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
        $stmt->execute([(int)$existing['id']]);

        jsonSuccess(['message' => 'Product removed']);
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

jsonError('Method not allowed', 405);

// ─── Helper ───────────────────────────────────────────────────────────────────
function formatProduct(array $row): array {
    return [
        'id'                => (string)$row['id'],
        '_id'               => (string)$row['id'],
        'slug'              => $row['slug'] ?? '',
        'name'              => $row['name'],
        'description'       => $row['description'] ?? '',
        'imgList'           => json_decode($row['imgList'] ?? '[]', true) ?? [],
        'applications'      => json_decode($row['applications'] ?? '[]', true) ?? [],
        'technicalDetails'  => json_decode($row['technicalDetails'] ?? '[]', true) ?? [],
        'features'          => json_decode($row['features'] ?? '[]', true) ?? [],
        'specificationHtml' => $row['specificationHtml'] ?? '',
        'status'            => (int)$row['status'],
        'createdAt'         => $row['createdAt'],
        'updatedAt'         => $row['updatedAt'],
    ];
}

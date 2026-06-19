<?php
/**
 * /api/products
 *   GET  — Get all products (public)
 *   POST — Create a product (protected)
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

// ─── GET all products ────────────────────────────────────────────────────────
if ($method === 'GET') {
    try {
        $pdo  = Database::getConnection();

        $pageIndex = isset($_GET['pageIndex']) ? (int)$_GET['pageIndex'] : 1;
        $pageSize  = isset($_GET['pageSize']) ? (int)$_GET['pageSize'] : 10;
        $query     = $_GET['query'] ?? '';

        $sortKey   = 'createdAt';
        $sortOrder = 'DESC';

        if (isset($_GET['sort']) && is_array($_GET['sort'])) {
            if (!empty($_GET['sort']['key'])) {
                $sortKey = $_GET['sort']['key'];
            }
            if (!empty($_GET['sort']['order'])) {
                $sortOrder = strtoupper($_GET['sort']['order']) === 'ASC' ? 'ASC' : 'DESC';
            }
        }

        $allowedSortKeys = ['id', 'name', 'slug', 'status', 'createdAt', 'updatedAt'];
        if (!in_array($sortKey, $allowedSortKeys)) {
            $sortKey = 'createdAt';
        }

        $whereClause = '';
        $params = [];
        
        if (!empty($query)) {
            $whereClause = 'WHERE name LIKE ? OR description LIKE ?';
            $params[] = '%' . $query . '%';
            $params[] = '%' . $query . '%';
        }

        $countSql = "SELECT COUNT(*) FROM products $whereClause";
        $stmtTotal = $pdo->prepare($countSql);
        $stmtTotal->execute($params);
        $total = $stmtTotal->fetchColumn();

        $offset = ($pageIndex - 1) * $pageSize;
        if ($offset < 0) $offset = 0;

        $sql = "SELECT * FROM products $whereClause ORDER BY $sortKey $sortOrder LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $paramIndex = 1;
        foreach ($params as $param) {
            $stmt->bindValue($paramIndex++, $param);
        }
        $stmt->bindValue($paramIndex++, $pageSize, PDO::PARAM_INT);
        $stmt->bindValue($paramIndex, $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $rows = $stmt->fetchAll();

        $products = array_map('formatProduct', $rows);

        jsonSuccess([
            'data'  => $products,
            'total' => (int)$total,
        ]);
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

// ─── POST create product ─────────────────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();

    $body = getJsonBody();

    $name              = trim($body['name'] ?? '');
    $slug              = trim($body['slug'] ?? '');
    $description       = $body['description'] ?? '';
    $imgList           = json_encode($body['imgList'] ?? []);
    $applications      = json_encode($body['applications'] ?? []);
    $technicalDetails  = json_encode($body['technicalDetails'] ?? []);
    $features          = json_encode($body['features'] ?? []);
    $specificationHtml = $body['specificationHtml'] ?? '';
    $status            = isset($body['status']) ? (int)$body['status'] : 0;

    if (empty($name)) {
        jsonError('Product name is required', 400);
    }

    try {
        $pdo  = Database::getConnection();
        $stmt = $pdo->prepare(
            'INSERT INTO products
             (name, slug, description, imgList, applications, technicalDetails, features, specificationHtml, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $name, $slug, $description,
            $imgList, $applications, $technicalDetails, $features,
            $specificationHtml, $status,
        ]);

        $newId = (int)$pdo->lastInsertId();

        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$newId]);
        $row = $stmt->fetch();

        jsonSuccess(formatProduct($row), 201);
    } catch (PDOException $e) {
        jsonError('Invalid product data: ' . $e->getMessage(), 400);
    }
}

jsonError('Method not allowed', 405);

// ─── Helper ──────────────────────────────────────────────────────────────────
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

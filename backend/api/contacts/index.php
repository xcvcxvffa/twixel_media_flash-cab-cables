<?php
/**
 * /api/contacts
 *   GET  — Get all contact enquiries (protected)
 *   POST — Create a new contact enquiry (public)
 */
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

// ─── GET all contacts ────────────────────────────────────────────────────────
if ($method === 'GET') {
    requireAuth(); // Only admin can view contacts

    try {
        $pdo = Database::getConnection();

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

        $allowedSortKeys = ['id', 'firstName', 'lastName', 'email', 'createdAt'];
        if (!in_array($sortKey, $allowedSortKeys)) {
            $sortKey = 'createdAt';
        }

        $whereClause = '';
        $params = [];
        
        if (!empty($query)) {
            $whereClause = 'WHERE firstName LIKE ? OR lastName LIKE ? OR email LIKE ?';
            $params[] = '%' . $query . '%';
            $params[] = '%' . $query . '%';
            $params[] = '%' . $query . '%';
        }

        $countSql = "SELECT COUNT(*) FROM contacts $whereClause";
        $stmtTotal = $pdo->prepare($countSql);
        $stmtTotal->execute($params);
        $total = $stmtTotal->fetchColumn();

        $offset = ($pageIndex - 1) * $pageSize;
        if ($offset < 0) $offset = 0;

        $sql = "SELECT * FROM contacts $whereClause ORDER BY $sortKey $sortOrder LIMIT ? OFFSET ?";
        
        $stmt = $pdo->prepare($sql);
        $paramIndex = 1;
        foreach ($params as $param) {
            $stmt->bindValue($paramIndex++, $param);
        }
        $stmt->bindValue($paramIndex++, $pageSize, PDO::PARAM_INT);
        $stmt->bindValue($paramIndex, $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        jsonSuccess([
            'data'  => $rows,
            'total' => (int)$total,
        ]);
    } catch (PDOException $e) {
        jsonError('Server error', 500);
    }
}

// ─── POST create contact ─────────────────────────────────────────────────────
if ($method === 'POST') {
    // Public API, no requireAuth()
    $body = getJsonBody();

    $firstName = trim($body['firstName'] ?? '');
    $lastName  = trim($body['lastName'] ?? '');
    $email     = trim($body['email'] ?? '');
    $message   = trim($body['message'] ?? '');

    if (empty($firstName) || empty($email) || empty($message)) {
        jsonError('First name, email, and message are required', 400);
    }

    try {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare('INSERT INTO contacts (firstName, lastName, email, message) VALUES (?, ?, ?, ?)');
        $stmt->execute([$firstName, $lastName, $email, $message]);

        jsonSuccess(['message' => 'Message sent successfully'], 201);
    } catch (PDOException $e) {
        jsonError('Database error', 500);
    }
}

// ─── DELETE contact ────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth(); // Only admin can delete contacts

    $body = getJsonBody();
    $id = isset($body['id']) ? (int)$body['id'] : 0;

    if (!$id) {
        // sometimes id is passed via URL if rewrite rules are setup, 
        // but let's assume it's passed in body for simplicity unless we have [id].php
        jsonError('ID is required', 400);
    }

    try {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare('DELETE FROM contacts WHERE id = ?');
        $stmt->execute([$id]);

        jsonSuccess(['message' => 'Contact deleted successfully']);
    } catch (PDOException $e) {
        jsonError('Database error', 500);
    }
}


jsonError('Method not allowed', 405);

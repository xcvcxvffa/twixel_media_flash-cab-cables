<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../middleware/auth.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    requireAuth();

    try {
        $pdo = Database::getConnection();

        // 1. Total views
        $stmt = $pdo->query('SELECT COUNT(*) as total_views FROM page_views');
        $total_views = $stmt->fetch(PDO::FETCH_ASSOC)['total_views'];

        // 2. Unique visitors (count unique session_ids)
        $stmt = $pdo->query('SELECT COUNT(DISTINCT session_id) as unique_visitors FROM page_views WHERE session_id != ""');
        $unique_visitors = $stmt->fetch(PDO::FETCH_ASSOC)['unique_visitors'];

        // 3. Top Pages (Grouped by URL)
        $stmt = $pdo->query('
            SELECT page_url, page_title, COUNT(*) as views 
            FROM page_views 
            GROUP BY page_url, page_title 
            ORDER BY views DESC 
            LIMIT 10
        ');
        $top_pages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 4. Views over time (Last 30 days)
        $stmt = $pdo->query('
            SELECT DATE(created_at) as date, COUNT(*) as views 
            FROM page_views 
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at) ASC
        ');
        $views_over_time = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 5. Devices
        $stmt = $pdo->query('
            SELECT device_type, COUNT(*) as count 
            FROM page_views 
            GROUP BY device_type 
            ORDER BY count DESC
        ');
        $devices = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 6. Browsers
        $stmt = $pdo->query('
            SELECT browser, COUNT(*) as count 
            FROM page_views 
            GROUP BY browser 
            ORDER BY count DESC
        ');
        $browsers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 7. Referrers
        $stmt = $pdo->query('
            SELECT referrer, COUNT(*) as count 
            FROM page_views 
            WHERE referrer != ""
            GROUP BY referrer 
            ORDER BY count DESC
            LIMIT 5
        ');
        $referrers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 8. Recent Activity
        $stmt = $pdo->query('
            SELECT page_title, page_url, device_type, browser, created_at 
            FROM page_views 
            ORDER BY created_at DESC 
            LIMIT 10
        ');
        $recent_activity = $stmt->fetchAll(PDO::FETCH_ASSOC);

        jsonSuccess([
            'data' => [
                'total_views' => (int)$total_views,
                'unique_visitors' => (int)$unique_visitors,
                'top_pages' => $top_pages,
                'views_over_time' => $views_over_time,
                'devices' => $devices,
                'browsers' => $browsers,
                'referrers' => $referrers,
                'recent_activity' => $recent_activity
            ]
        ]);
    } catch (PDOException $e) {
        jsonError('Server error: ' . $e->getMessage(), 500);
    }
}

jsonError('Method not allowed', 405);

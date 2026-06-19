<?php
require_once dirname(__DIR__, 2) . '/config/db.php';
require_once dirname(__DIR__, 2) . '/helpers/response.php';
require_once dirname(__DIR__, 2) . '/middleware/auth.php';

setCorsHeaders();
handlePreflight();

requireAuth(); // Ensure only authenticated users (admin) can upload

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    jsonError('File upload failed or no file provided');
}

$file = $_FILES['file'];
$uploadDir = dirname(__DIR__, 2) . '/uploads/images/';

// Create directory if it doesn't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
if (!in_array($file['type'], $allowedTypes)) {
    jsonError('Invalid file type. Only JPG, PNG, GIF, WEBP and SVG are allowed.');
}

// Generate unique filename
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('img_') . '.' . $ext;
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    // Generate absolute URL dynamically based on the current server host
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $baseUrl = $protocol . "://" . $host;
    
    // Return absolute URL for frontend consumption
    $url = $baseUrl . '/uploads/images/' . $filename;
    jsonSuccess(['url' => $url]);
} else {
    jsonError('Failed to move uploaded file');
}

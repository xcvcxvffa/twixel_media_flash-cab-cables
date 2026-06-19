<?php
/**
 * POST /api/forgot-password
 * Mock endpoint — returns true (implement email later)
 */
require_once __DIR__ . '/../../helpers/response.php';
setCorsHeaders();
handlePreflight();
jsonSuccess(true);

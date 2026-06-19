<?php
/**
 * POST /api/reset-password
 * Mock endpoint — returns true (implement token reset later)
 */
require_once __DIR__ . '/../../helpers/response.php';
setCorsHeaders();
handlePreflight();
jsonSuccess(true);

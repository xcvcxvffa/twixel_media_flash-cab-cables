<?php
/**
 * POST /api/sign-out
 * Client-side token destruction — just return true
 */
require_once __DIR__ . '/../../helpers/response.php';

setCorsHeaders();
handlePreflight();

jsonSuccess(true);

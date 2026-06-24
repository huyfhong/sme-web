<?php

// Handle CORS preflight (PHP built-in server doesn't pass OPTIONS to router)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    return true;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// API backend routes
if (strpos($uri, '/api/') === 0) {
    require __DIR__ . '/backend/api/index.php';
    return true;
}

// Chatbot API routes
if (strpos($uri, '/chatbot/BE_chatbot/api/') === 0) {
    require __DIR__ . '/chatbot/BE_chatbot/api/chatbot.php';
    return true;
}

// Serve static files — try actual path first, then fallback to frontend/
$filePath = __DIR__ . $uri;
if (is_file($filePath)) {
    return false;
}
$filePath = __DIR__ . '/frontend' . $uri;
if (is_file($filePath)) {
    readfile($filePath);
    return true;
}

// SPA fallback
$indexFile = __DIR__ . '/frontend/index.html';
if (file_exists($indexFile)) {
    require $indexFile;
    return true;
}

return false;

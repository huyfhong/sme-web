<?php
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
    return false;
}

// SPA fallback
$indexFile = __DIR__ . '/frontend/index.html';
if (file_exists($indexFile)) {
    require $indexFile;
    return true;
}

return false;

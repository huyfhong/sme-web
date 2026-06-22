<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../models/ChatbotCls.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $message =  $input['message'] ?? '';

    $bot = new Chatbot();
    $reply = $bot->getResponse($message);

    echo json_encode(['reply' => $reply]);
} catch (Exception $e) {
    echo json_encode(['reply' => 'Có lỗi xảy ra trên hệ thống: ' . $e->getMessage()]);
}
?>
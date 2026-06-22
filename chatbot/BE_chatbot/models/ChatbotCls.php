<?php
class Chatbot {
    private $dataFile = __DIR__ . '/../data/chat_bot_rule.json';

    public function getResponse($userMessage) {
        if (!file_exists($this->dataFile)) {
            return "Lỗi: Không tìm thấy file dữ liệu tại " . $this->dataFile;
        }
        
        $jsonContent = file_get_contents($this->dataFile);
        $rules = json_decode($jsonContent, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return "Lỗi: File dữ liệu không hợp lệ.";
        }

        $userMessage = function_exists('mb_strtolower') ? mb_strtolower($userMessage, 'UTF-8') : strtolower($userMessage);

        foreach ($rules as $rule){
            foreach ($rule['keywords'] as $keyword) {
                $loweredKeyword = function_exists('mb_strtolower') ? mb_strtolower($keyword, 'UTF-8') : strtolower($keyword);
                if (function_exists('mb_strpos')) {
                    if (mb_strpos($userMessage, $loweredKeyword) !== false) {
                        return $rule['response'];
                    }
                } else {
                    if (strpos($userMessage, $loweredKeyword) !== false) {
                        return $rule['response'];
                    }
                }
            }
        }
        return "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể tham khảo các câu hỏi thường gặp tại mục FAQ trên Trang hỗ trợ Viettel Telecom, hoặc gọi tổng đài 18008098 để được hỗ trợ trực tiếp. Tôi có thể giúp gì cho bạn?";
    }
}
?>
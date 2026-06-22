const suggestedQuestions = [
    "Giới thiệu các sản phẩm?",
    "Nhận tư vấn",
    "Các gói cước 4G/5G hiện có?",
    "Kiểm tra số dư tài khoản",
    "Cửa hàng Viettel gần nhất",
    "Báo lỗi mất sóng",
    "Hướng dẫn dùng My Viettel"
];

const renderSuggestions = () => {
    const suggestionsDiv = document.getElementById('suggestions');
    if (!suggestionsDiv) return;

    suggestionsDiv.innerHTML = '';
    suggestedQuestions.forEach(question => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.innerText = question;
        btn.onclick = () => sendChatMessage(question);
        suggestionsDiv.appendChild(btn);
    });
};

const sendChatMessage = async (message) => {
    // Ẩn gợi ý sau khi người dùng đã bắt đầu chat hoặc chọn một gợi ý
    const suggestionsDiv = document.getElementById('suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }

    renderMessage(message, 'user');

    // Tự động xác định URL API
    let apiUrl = 'http://localhost:8000/chatbot/BE_chatbot/api/chatbot.php';

    console.log('Đang gọi tới API:', apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Lỗi Server:', response.status, errorText);
            throw new Error(`Mã lỗi ${response.status}`);
        }

        const data = await response.json();
        renderMessage(data.reply, 'bot');
    } catch (error) {
        console.error('Chi tiết lỗi kết nối:', error);
        renderMessage('Lỗi kết nối máy chủ. Vui lòng đảm bảo Apache đã bật và URL chính xác.', 'bot');
    }
};

// Khởi tạo gợi ý khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    renderSuggestions();
});

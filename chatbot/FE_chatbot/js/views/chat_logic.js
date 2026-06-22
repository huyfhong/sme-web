function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
}

function toggleSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    if (!suggestionsDiv) return;
    if (suggestionsDiv.style.display === 'none') {
        suggestionsDiv.style.display = 'flex';
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

function renderMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) return;
    
    const row = document.createElement('div');
    row.classList.add('message-row', sender === 'bot' ? 'bot-row' : 'user-row');

    if (sender === 'bot') {
        const avatar = document.createElement('img');
        avatar.src = 'https://media.vietteltelecom.vn/upload/ckfinder/files/icon%20chatbot.png';
        avatar.classList.add('bot-avatar');
        avatar.alt = 'Avatar';
        row.appendChild(avatar);
    }

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    if (sender === 'bot') {
        msgDiv.innerHTML = message;
    } else {
        msgDiv.innerText = message;
    }
    row.appendChild(msgDiv);

    messagesDiv.appendChild(row);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleSend() {
    const input = document.getElementById('user-input');
    if (!input) return;
    const message = input.value.trim();
    if (message) {
        if (typeof sendChatMessage === 'function') {
            sendChatMessage(message);
            input.value = '';
        } else {
            console.error('Hàm sendChatMessage chưa được tải!');
        }
    }
}

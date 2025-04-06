// Chat functionality for collaboration hub
document.addEventListener('DOMContentLoaded', function() {
    const sendMessageBtn = document.getElementById('send-message-btn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    // Load chat messages
    loadChatMessages();
});

// Function to load chat messages
function loadChatMessages() {
    // Fetch chat messages from the server
    fetch('/api/chat')
        .then(response => response.json())
        .then(data => {
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = ''; // Clear existing messages

            data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.innerHTML = `
                    <strong>${message.sender}</strong>: ${message.text}
                `;
                chatContainer.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Error loading chat messages:', error));
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value;

    if (messageText.trim() === '') {
        return; // Don't send empty messages
    }

    // Send message to the server
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: messageText }),
    })
    .then(response => response.json())
    .then(data => {
        messageInput.value = ''; // Clear input
        loadChatMessages(); // Reload messages
    })
    .catch(error => console.error('Error sending message:', error));
}
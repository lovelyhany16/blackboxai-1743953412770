const express = require('express');
const router = express.Router();

// Sample chat messages
let chatMessages = [
    { sender: 'John Doe', text: 'Hello, team!' },
    { sender: 'You', text: 'Hi, John!' },
];

// Get all chat messages
router.get('/', (req, res) => {
    res.json(chatMessages);
});

// Send a new chat message
router.post('/', (req, res) => {
    const newMessage = { sender: 'You', text: req.body.text };
    chatMessages.push(newMessage);
    res.status(201).json(newMessage);
});

module.exports = router;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/inventory', require('./api/inventory'));
app.use('/api/chat', require('./api/chat'));
app.use('/api/auth', require('./api/auth'));

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
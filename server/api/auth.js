const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock user database
const users = [
    {
        id: '1',
        username: 'admin',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq1V1zHXgD5/KRud3J9W6Q5UQJQ1eO', // "password"
        role: 'admin'
    }
];

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// Verify token middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;
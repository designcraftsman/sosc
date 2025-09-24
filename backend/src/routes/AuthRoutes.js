const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { authenticateToken, authenticateAdmin } = require('../middlewares/Auth');

// Public routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register); // Can be protected later

// Protected routes
router.get('/me', authenticateToken, AuthController.me);
router.post('/logout', authenticateToken, AuthController.logout);
router.put('/change-password', authenticateToken, AuthController.changePassword);

module.exports = router;
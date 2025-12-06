const express = require('express');
const router = express.Router();
const SecurityController = require('../controllers/SecurityController');
const authMiddleware = require('../middlewares/Auth');

// Public endpoint - report attack (no auth required)
router.post('/report-attack', SecurityController.reportAttack);

// Admin endpoints - require authentication
router.get('/logs', authMiddleware, SecurityController.getAllLogs);
router.get('/logs/:id', authMiddleware, SecurityController.getLogById);
router.get('/statistics', authMiddleware, SecurityController.getStatistics);
router.post('/cleanup', authMiddleware, SecurityController.cleanupOldLogs);

module.exports = router;

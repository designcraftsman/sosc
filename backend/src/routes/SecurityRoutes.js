const express = require('express');
const router = express.Router();
const SecurityController = require('../controllers/SecurityController');
const { authenticateAdmin } = require('../middlewares/Auth');

// Public endpoint - report attack (no auth required)
router.post('/report-attack', SecurityController.reportAttack);

// Admin endpoints - require authentication
router.get('/logs', authenticateAdmin, SecurityController.getAllLogs);
router.get('/logs/:id', authenticateAdmin, SecurityController.getLogById);
router.get('/statistics', authenticateAdmin, SecurityController.getStatistics);
router.post('/cleanup', authenticateAdmin, SecurityController.cleanupOldLogs);

module.exports = router;

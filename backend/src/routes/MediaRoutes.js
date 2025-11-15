const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/MediaController');
const { authenticateAdmin } = require('../middlewares/Auth');
const upload = require('../middlewares/Upload');

// Admin routes - all require authentication
router.post('/admin/media/upload', authenticateAdmin, upload.single('file'), MediaController.uploadMedia);
router.get('/admin/media', authenticateAdmin, MediaController.getAllMedia);
router.get('/admin/media/stats', authenticateAdmin, MediaController.getMediaStats);
router.get('/admin/media/:id', authenticateAdmin, MediaController.getMediaById);
router.put('/admin/media/:id', authenticateAdmin, MediaController.updateMedia);
router.delete('/admin/media/:id', authenticateAdmin, MediaController.deleteMedia);

module.exports = router;

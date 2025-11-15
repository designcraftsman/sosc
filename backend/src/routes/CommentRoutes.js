const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { authenticateAdmin } = require('../middlewares/Auth');

// Public routes
router.get('/articles/:articleId/comments', CommentController.getArticleComments);
router.post('/articles/:articleId/comments', CommentController.createComment);

// Admin routes
router.get('/admin/comments', authenticateAdmin, CommentController.getAllComments);
router.get('/admin/comments/:id', authenticateAdmin, CommentController.getCommentById);
router.patch('/admin/comments/:id/status', authenticateAdmin, CommentController.updateCommentStatus);
router.delete('/admin/comments/:id', authenticateAdmin, CommentController.deleteComment);

module.exports = router;

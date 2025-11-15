const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const { authenticateAdmin } = require('../middlewares/Auth');

// Public routes (no authentication required)
router.get('/articles', ArticleController.getPublishedArticles);
router.get('/articles/featured', ArticleController.getFeaturedArticles);
router.get('/articles/search', ArticleController.searchArticles);
router.get('/articles/categories', ArticleController.getCategories);
router.get('/articles/tags', ArticleController.getTags);
router.get('/articles/:slug', ArticleController.getArticleBySlug);

// Admin routes (authentication required)
router.get('/admin/articles', authenticateAdmin, ArticleController.getAllArticles);
router.get('/admin/articles/:id', authenticateAdmin, ArticleController.getArticleById);
router.post('/admin/articles', authenticateAdmin, ArticleController.createArticle);
router.put('/admin/articles/:id', authenticateAdmin, ArticleController.updateArticle);
router.delete('/admin/articles/:id', authenticateAdmin, ArticleController.deleteArticle);

module.exports = router;

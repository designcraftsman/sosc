const ArticleService = require('../services/ArticleService');
const Article = require('../models/Article');

// Public endpoints (no auth required)

// Get all published articles
exports.getPublishedArticles = async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            status: 'published',
            category,
            limit: parseInt(limit),
            offset: parseInt(offset),
            orderBy: 'published_at',
            order: 'DESC'
        };

        const result = await ArticleService.getAllArticles(filters);

        res.status(200).json({
            success: true,
            data: result.articles,
            pagination: {
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / limit),
                hasMore: result.hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching published articles:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch articles' 
        });
    }
};

// Get single article by slug
exports.getArticleBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await ArticleService.getArticleBySlug(slug, true);

        if (!article) {
            return res.status(404).json({ 
                success: false,
                error: 'Article not found' 
            });
        }

        if (article.status !== 'published') {
            return res.status(404).json({ 
                success: false,
                error: 'Article not found' 
            });
        }

        // Get related articles
        const relatedArticles = await ArticleService.getRelatedArticles(
            article.id, 
            article.category, 
            3
        );

        res.status(200).json({
            success: true,
            data: {
                article,
                relatedArticles
            }
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch article' 
        });
    }
};

// Get featured articles
exports.getFeaturedArticles = async (req, res) => {
    try {
        const { limit = 3 } = req.query;
        const articles = await ArticleService.getFeaturedArticles(parseInt(limit));

        res.status(200).json({
            success: true,
            data: articles
        });
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch featured articles' 
        });
    }
};

// Search articles
exports.searchArticles = async (req, res) => {
    try {
        const { q, limit = 10 } = req.query;

        if (!q || q.trim().length === 0) {
            return res.status(400).json({ 
                success: false,
                error: 'Search query is required' 
            });
        }

        const articles = await ArticleService.searchArticles(q, parseInt(limit));

        res.status(200).json({
            success: true,
            data: articles,
            query: q
        });
    } catch (error) {
        console.error('Error searching articles:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to search articles' 
        });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await ArticleService.getAllCategories();

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch categories' 
        });
    }
};

// Get all tags
exports.getTags = async (req, res) => {
    try {
        const tags = await ArticleService.getAllTags();

        res.status(200).json({
            success: true,
            data: tags
        });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch tags' 
        });
    }
};

// Admin endpoints (auth required)

// Get all articles (including drafts) - Admin only
exports.getAllArticles = async (req, res) => {
    try {
        const { status, category, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            status,
            category,
            limit: parseInt(limit),
            offset: parseInt(offset),
            orderBy: 'created_at',
            order: 'DESC'
        };

        const result = await ArticleService.getAllArticles(filters);

        res.status(200).json({
            success: true,
            data: result.articles,
            pagination: {
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / limit),
                hasMore: result.hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching all articles:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch articles' 
        });
    }
};

// Get article by ID - Admin only
exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ArticleService.getArticleById(id);

        if (!article) {
            return res.status(404).json({ 
                success: false,
                error: 'Article not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: article
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch article' 
        });
    }
};

// Create article - Admin only
exports.createArticle = async (req, res) => {
    try {
        const { title, slug, excerpt, content, featuredImage, category, tags, status, embeddedVideos } = req.body;
        
        // Get author from authenticated user
        const author = req.user.username || 'SOSC Admin';

        // Generate slug if not provided
        const finalSlug = slug || Article.generateSlug(title);

        // Validate article data
        const articleData = new Article(
            title, 
            finalSlug, 
            content, 
            author, 
            excerpt, 
            featuredImage, 
            category, 
            tags, 
            status || 'draft',
            embeddedVideos || []
        );

        if (!articleData.isValid()) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid article data. Title, slug, content, and author are required.' 
            });
        }

        // Check if slug already exists
        const existingArticle = await ArticleService.getArticleBySlug(finalSlug, false);
        if (existingArticle) {
            return res.status(400).json({ 
                success: false,
                error: 'An article with this slug already exists' 
            });
        }

        // Create article
        const article = await ArticleService.createArticle({
            title,
            slug: finalSlug,
            excerpt,
            content,
            author,
            featuredImage,
            category,
            tags,
            status: status || 'draft',
            embeddedVideos: embeddedVideos || []
        });

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            data: article
        });
    } catch (error) {
        console.error('Error creating article:', error);
        
        if (error.code === '23505') { // Unique constraint violation
            return res.status(400).json({ 
                success: false,
                error: 'An article with this slug already exists' 
            });
        }

        res.status(500).json({ 
            success: false,
            error: 'Failed to create article' 
        });
    }
};

// Update article - Admin only
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, excerpt, content, featuredImage, category, tags, status, embeddedVideos } = req.body;

        // Check if article exists
        const existingArticle = await ArticleService.getArticleById(id);
        if (!existingArticle) {
            return res.status(404).json({ 
                success: false,
                error: 'Article not found' 
            });
        }

        // If slug is being changed, check if new slug already exists
        if (slug && slug !== existingArticle.slug) {
            const articleWithSlug = await ArticleService.getArticleBySlug(slug, false);
            if (articleWithSlug) {
                return res.status(400).json({ 
                    success: false,
                    error: 'An article with this slug already exists' 
                });
            }
        }

        // Update article
        const updateData = {
            title: title || existingArticle.title,
            slug: slug || existingArticle.slug,
            excerpt: excerpt !== undefined ? excerpt : existingArticle.excerpt,
            content: content || existingArticle.content,
            author: existingArticle.author, // Keep original author
            featuredImage: featuredImage !== undefined ? featuredImage : existingArticle.featured_image,
            category: category !== undefined ? category : existingArticle.category,
            tags: tags || existingArticle.tags,
            status: status || existingArticle.status,
            embeddedVideos: embeddedVideos !== undefined ? embeddedVideos : existingArticle.embedded_videos
        };

        const article = await ArticleService.updateArticle(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: article
        });
    } catch (error) {
        console.error('Error updating article:', error);
        
        if (error.code === '23505') { // Unique constraint violation
            return res.status(400).json({ 
                success: false,
                error: 'An article with this slug already exists' 
            });
        }

        res.status(500).json({ 
            success: false,
            error: 'Failed to update article' 
        });
    }
};

// Delete article - Admin only
exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if article exists
        const existingArticle = await ArticleService.getArticleById(id);
        if (!existingArticle) {
            return res.status(404).json({ 
                success: false,
                error: 'Article not found' 
            });
        }

        await ArticleService.deleteArticle(id);

        res.status(200).json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete article' 
        });
    }
};

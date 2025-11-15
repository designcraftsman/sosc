const db = require('../config/Db');
const Article = require('../models/Article');

class ArticleService {
    // Create a new article
    static async createArticle(articleData) {
        const { title, slug, excerpt, content, author, featuredImage, category, tags, status, embeddedVideos } = articleData;
        
        const query = `
            INSERT INTO blog_articles 
            (title, slug, excerpt, content, author, featured_image, category, tags, status, embedded_videos, published_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        
        const publishedAt = status === 'published' ? new Date() : null;
        const values = [title, slug, excerpt, content, author, featuredImage, category, tags, status, embeddedVideos || [], publishedAt];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    }

    // Get all articles with filters and pagination
    static async getAllArticles(filters = {}) {
        const { status, category, limit = 10, offset = 0, orderBy = 'created_at', order = 'DESC' } = filters;
        
        let query = 'SELECT * FROM blog_articles WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (status) {
            query += ` AND status = $${paramCount}`;
            values.push(status);
            paramCount++;
        }

        if (category) {
            query += ` AND category = $${paramCount}`;
            values.push(category);
            paramCount++;
        }

        query += ` ORDER BY ${orderBy} ${order} LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        try {
            const result = await db.query(query, values);
            
            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM blog_articles WHERE 1=1';
            const countValues = [];
            let countParamCount = 1;

            if (status) {
                countQuery += ` AND status = $${countParamCount}`;
                countValues.push(status);
                countParamCount++;
            }

            if (category) {
                countQuery += ` AND category = $${countParamCount}`;
                countValues.push(category);
            }

            const countResult = await db.query(countQuery, countValues);
            const total = parseInt(countResult.rows[0].count);

            return {
                articles: result.rows,
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            };
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }

    // Get article by ID
    static async getArticleById(id) {
        const query = 'SELECT * FROM blog_articles WHERE id = $1';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching article by ID:', error);
            throw error;
        }
    }

    // Get article by slug and increment views
    static async getArticleBySlug(slug, incrementViews = true) {
        let query = 'SELECT * FROM blog_articles WHERE slug = $1';
        
        try {
            const result = await db.query(query, [slug]);
            const article = result.rows[0];

            if (article && incrementViews) {
                await this.incrementViews(article.id);
                article.views = (article.views || 0) + 1;
            }

            return article;
        } catch (error) {
            console.error('Error fetching article by slug:', error);
            throw error;
        }
    }

    // Update article
    static async updateArticle(id, updateData) {
        const { title, slug, excerpt, content, author, featuredImage, category, tags, status, embeddedVideos } = updateData;
        
        const query = `
            UPDATE blog_articles 
            SET title = $1, slug = $2, excerpt = $3, content = $4, author = $5, 
                featured_image = $6, category = $7, tags = $8, status = $9, embedded_videos = $10,
                published_at = CASE 
                    WHEN status != 'published' AND $9 = 'published' THEN CURRENT_TIMESTAMP
                    WHEN status = 'published' AND $9 = 'published' THEN published_at
                    ELSE NULL
                END
            WHERE id = $11
            RETURNING *
        `;
        
        const values = [title, slug, excerpt, content, author, featuredImage, category, tags, status, embeddedVideos, id];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    }

    // Delete article
    static async deleteArticle(id) {
        const query = 'DELETE FROM blog_articles WHERE id = $1 RETURNING *';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    }

    // Increment article views
    static async incrementViews(id) {
        const query = 'UPDATE blog_articles SET views = views + 1 WHERE id = $1';
        
        try {
            await db.query(query, [id]);
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    }

    // Get featured articles
    static async getFeaturedArticles(limit = 3) {
        const query = `
            SELECT * FROM blog_articles 
            WHERE status = 'published' 
            ORDER BY views DESC, published_at DESC 
            LIMIT $1
        `;
        
        try {
            const result = await db.query(query, [limit]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching featured articles:', error);
            throw error;
        }
    }

    // Get related articles by category
    static async getRelatedArticles(articleId, category, limit = 3) {
        const query = `
            SELECT * FROM blog_articles 
            WHERE status = 'published' 
            AND category = $1 
            AND id != $2
            ORDER BY published_at DESC 
            LIMIT $3
        `;
        
        try {
            const result = await db.query(query, [category, articleId, limit]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching related articles:', error);
            throw error;
        }
    }

    // Search articles
    static async searchArticles(searchTerm, limit = 10) {
        const query = `
            SELECT * FROM blog_articles 
            WHERE status = 'published' 
            AND (
                title ILIKE $1 
                OR content ILIKE $1 
                OR excerpt ILIKE $1
                OR $2 = ANY(tags)
            )
            ORDER BY published_at DESC 
            LIMIT $3
        `;
        
        try {
            const searchPattern = `%${searchTerm}%`;
            const result = await db.query(query, [searchPattern, searchTerm, limit]);
            return result.rows;
        } catch (error) {
            console.error('Error searching articles:', error);
            throw error;
        }
    }

    // Get all categories
    static async getAllCategories() {
        const query = `
            SELECT DISTINCT category, COUNT(*) as count 
            FROM blog_articles 
            WHERE status = 'published' AND category IS NOT NULL
            GROUP BY category
            ORDER BY count DESC
        `;
        
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    // Get all tags
    static async getAllTags() {
        const query = `
            SELECT UNNEST(tags) as tag, COUNT(*) as count 
            FROM blog_articles 
            WHERE status = 'published'
            GROUP BY tag
            ORDER BY count DESC
        `;
        
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching tags:', error);
            throw error;
        }
    }
}

module.exports = ArticleService;

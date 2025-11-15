const db = require('../config/Db');
const Comment = require('../models/Comment');

class CommentService {
    // Create a new comment
    static async createComment(commentData) {
        const { articleId, parentCommentId, authorName, authorEmail, content, status } = commentData;
        
        const query = `
            INSERT INTO blog_comments 
            (article_id, parent_comment_id, author_name, author_email, content, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        
        const sanitizedContent = Comment.sanitizeContent(content);
        const values = [articleId, parentCommentId, authorName, authorEmail, sanitizedContent, status || 'pending'];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    // Get all comments for an article (approved only for public)
    static async getCommentsByArticleId(articleId, includeAll = false) {
        let query = `
            SELECT * FROM blog_comments 
            WHERE article_id = $1
        `;
        
        if (!includeAll) {
            query += ` AND status = 'approved'`;
        }
        
        query += ` ORDER BY created_at DESC`;
        
        try {
            const result = await db.query(query, [articleId]);
            
            // Organize comments into a tree structure (parent-child)
            const comments = result.rows;
            const commentMap = new Map();
            const rootComments = [];
            
            // First pass: create map of all comments
            comments.forEach(comment => {
                comment.replies = [];
                commentMap.set(comment.id, comment);
            });
            
            // Second pass: organize into tree
            comments.forEach(comment => {
                if (comment.parent_comment_id) {
                    const parent = commentMap.get(comment.parent_comment_id);
                    if (parent) {
                        parent.replies.push(comment);
                    }
                } else {
                    rootComments.push(comment);
                }
            });
            
            return rootComments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }

    // Get all comments with filters (admin)
    static async getAllComments(filters = {}) {
        const { status, articleId, limit = 50, offset = 0 } = filters;
        
        let query = 'SELECT c.*, a.title as article_title FROM blog_comments c LEFT JOIN blog_articles a ON c.article_id = a.id WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (status) {
            query += ` AND c.status = $${paramCount}`;
            values.push(status);
            paramCount++;
        }

        if (articleId) {
            query += ` AND c.article_id = $${paramCount}`;
            values.push(articleId);
            paramCount++;
        }

        query += ` ORDER BY c.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        try {
            const result = await db.query(query, values);
            
            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM blog_comments WHERE 1=1';
            const countValues = [];
            let countParamCount = 1;

            if (status) {
                countQuery += ` AND status = $${countParamCount}`;
                countValues.push(status);
                countParamCount++;
            }

            if (articleId) {
                countQuery += ` AND article_id = $${countParamCount}`;
                countValues.push(articleId);
            }

            const countResult = await db.query(countQuery, countValues);
            const total = parseInt(countResult.rows[0].count);

            return {
                comments: result.rows,
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            };
        } catch (error) {
            console.error('Error fetching all comments:', error);
            throw error;
        }
    }

    // Get comment by ID
    static async getCommentById(id) {
        const query = 'SELECT * FROM blog_comments WHERE id = $1';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching comment by ID:', error);
            throw error;
        }
    }

    // Update comment status
    static async updateCommentStatus(id, status) {
        const query = `
            UPDATE blog_comments 
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        
        try {
            const result = await db.query(query, [status, id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating comment status:', error);
            throw error;
        }
    }

    // Delete comment
    static async deleteComment(id) {
        const query = 'DELETE FROM blog_comments WHERE id = $1 RETURNING *';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }

    // Get comment count for an article
    static async getCommentCount(articleId, approvedOnly = true) {
        let query = 'SELECT COUNT(*) FROM blog_comments WHERE article_id = $1';
        const values = [articleId];
        
        if (approvedOnly) {
            query += ' AND status = $2';
            values.push('approved');
        }
        
        try {
            const result = await db.query(query, values);
            return parseInt(result.rows[0].count);
        } catch (error) {
            console.error('Error getting comment count:', error);
            throw error;
        }
    }
}

module.exports = CommentService;

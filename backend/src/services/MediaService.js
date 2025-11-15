const db = require('../config/Db');
const Media = require('../models/Media');

class MediaService {
    // Create media record
    static async createMedia(mediaData) {
        const { 
            articleId, filename, originalFilename, filePath, fileType, 
            mimeType, fileSize, width, height, duration, altText, caption, uploadedBy 
        } = mediaData;
        
        const query = `
            INSERT INTO blog_media 
            (article_id, filename, original_filename, file_path, file_type, mime_type, 
             file_size, width, height, duration, alt_text, caption, uploaded_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *
        `;
        
        const values = [
            articleId || null, filename, originalFilename, filePath, fileType, mimeType,
            fileSize, width || null, height || null, duration || null, 
            altText || null, caption || null, uploadedBy || null
        ];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating media record:', error);
            throw error;
        }
    }

    // Get media by ID
    static async getMediaById(id) {
        const query = 'SELECT * FROM blog_media WHERE id = $1';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching media by ID:', error);
            throw error;
        }
    }

    // Get all media for an article
    static async getMediaByArticleId(articleId) {
        const query = `
            SELECT * FROM blog_media 
            WHERE article_id = $1 
            ORDER BY created_at DESC
        `;
        
        try {
            const result = await db.query(query, [articleId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching media by article ID:', error);
            throw error;
        }
    }

    // Get all media with filters
    static async getAllMedia(filters = {}) {
        const { fileType, articleId, limit = 50, offset = 0 } = filters;
        
        let query = 'SELECT * FROM blog_media WHERE 1=1';
        const values = [];
        let paramCount = 1;

        if (fileType) {
            query += ` AND file_type = $${paramCount}`;
            values.push(fileType);
            paramCount++;
        }

        if (articleId) {
            query += ` AND article_id = $${paramCount}`;
            values.push(articleId);
            paramCount++;
        }

        query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        values.push(limit, offset);

        try {
            const result = await db.query(query, values);
            
            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM blog_media WHERE 1=1';
            const countValues = [];
            let countParamCount = 1;

            if (fileType) {
                countQuery += ` AND file_type = $${countParamCount}`;
                countValues.push(fileType);
                countParamCount++;
            }

            if (articleId) {
                countQuery += ` AND article_id = $${countParamCount}`;
                countValues.push(articleId);
            }

            const countResult = await db.query(countQuery, countValues);
            const total = parseInt(countResult.rows[0].count);

            return {
                media: result.rows,
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            };
        } catch (error) {
            console.error('Error fetching all media:', error);
            throw error;
        }
    }

    // Update media metadata
    static async updateMedia(id, updateData) {
        const { articleId, altText, caption, width, height, duration } = updateData;
        
        const query = `
            UPDATE blog_media 
            SET article_id = COALESCE($1, article_id),
                alt_text = COALESCE($2, alt_text),
                caption = COALESCE($3, caption),
                width = COALESCE($4, width),
                height = COALESCE($5, height),
                duration = COALESCE($6, duration)
            WHERE id = $7
            RETURNING *
        `;
        
        const values = [articleId, altText, caption, width, height, duration, id];
        
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating media:', error);
            throw error;
        }
    }

    // Delete media
    static async deleteMedia(id) {
        const query = 'DELETE FROM blog_media WHERE id = $1 RETURNING *';
        
        try {
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting media:', error);
            throw error;
        }
    }

    // Get media statistics
    static async getMediaStats() {
        const query = `
            SELECT 
                file_type,
                COUNT(*) as count,
                SUM(file_size) as total_size,
                AVG(file_size) as avg_size
            FROM blog_media
            GROUP BY file_type
        `;
        
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching media stats:', error);
            throw error;
        }
    }
}

module.exports = MediaService;

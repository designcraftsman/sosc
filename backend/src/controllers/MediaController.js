const MediaService = require('../services/MediaService');
const Media = require('../models/Media');
const path = require('path');
const fs = require('fs').promises;

// Upload media file
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                error: 'No file uploaded' 
            });
        }

        const file = req.file;
        const { articleId, altText, caption } = req.body;

        // Validate file type
        if (!Media.isAllowedFileType(file.mimetype)) {
            // Delete the uploaded file
            await fs.unlink(file.path);
            return res.status(400).json({ 
                success: false,
                error: 'File type not allowed. Allowed types: images (jpg, png, gif, webp, svg), videos (mp4, webm, ogg), PDF' 
            });
        }

        // Get file type
        const fileType = Media.getFileTypeFromMime(file.mimetype);

        // Check file size
        if (!Media.checkFileSize(file.size, fileType)) {
            await fs.unlink(file.path);
            return res.status(400).json({ 
                success: false,
                error: `File too large. Max size: ${fileType === 'image' ? '5MB' : fileType === 'video' ? '100MB' : '10MB'}` 
            });
        }

        // Get author from authenticated user
        const uploadedBy = req.user ? req.user.username : null;

        // Create media record
        const mediaData = {
            articleId: articleId ? parseInt(articleId) : null,
            filename: file.filename,
            originalFilename: file.originalname,
            filePath: `/uploads/${file.filename}`,
            fileType,
            mimeType: file.mimetype,
            fileSize: file.size,
            altText: altText || null,
            caption: caption || null,
            uploadedBy
        };

        const media = await MediaService.createMedia(mediaData);

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            data: media
        });
    } catch (error) {
        console.error('Error uploading media:', error);
        
        // Clean up uploaded file on error
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(500).json({ 
            success: false,
            error: 'Failed to upload file' 
        });
    }
};

// Get media by ID
exports.getMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await MediaService.getMediaById(id);

        if (!media) {
            return res.status(404).json({ 
                success: false,
                error: 'Media not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: media
        });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch media' 
        });
    }
};

// Get all media with filters
exports.getAllMedia = async (req, res) => {
    try {
        const { fileType, articleId, page = 1, limit = 50 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            fileType,
            articleId: articleId ? parseInt(articleId) : null,
            limit: parseInt(limit),
            offset: parseInt(offset)
        };

        const result = await MediaService.getAllMedia(filters);

        res.status(200).json({
            success: true,
            data: result.media,
            pagination: {
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / limit),
                hasMore: result.hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch media' 
        });
    }
};

// Update media metadata
exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { articleId, altText, caption, width, height, duration } = req.body;

        const media = await MediaService.getMediaById(id);
        if (!media) {
            return res.status(404).json({ 
                success: false,
                error: 'Media not found' 
            });
        }

        const updateData = {
            articleId: articleId !== undefined ? parseInt(articleId) : undefined,
            altText: altText !== undefined ? altText : undefined,
            caption: caption !== undefined ? caption : undefined,
            width: width !== undefined ? parseInt(width) : undefined,
            height: height !== undefined ? parseInt(height) : undefined,
            duration: duration !== undefined ? parseInt(duration) : undefined
        };

        const updatedMedia = await MediaService.updateMedia(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Media updated successfully',
            data: updatedMedia
        });
    } catch (error) {
        console.error('Error updating media:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to update media' 
        });
    }
};

// Delete media
exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await MediaService.getMediaById(id);
        if (!media) {
            return res.status(404).json({ 
                success: false,
                error: 'Media not found' 
            });
        }

        // Delete file from filesystem
        const uploadsDir = path.join(__dirname, '../../uploads');
        const filePath = path.join(uploadsDir, media.filename);
        
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error deleting file:', error);
            // Continue even if file deletion fails
        }

        // Delete from database
        await MediaService.deleteMedia(id);

        res.status(200).json({
            success: true,
            message: 'Media deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete media' 
        });
    }
};

// Get media statistics
exports.getMediaStats = async (req, res) => {
    try {
        const stats = await MediaService.getMediaStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching media stats:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch media statistics' 
        });
    }
};

const CommentService = require('../services/CommentService');
const Comment = require('../models/Comment');

// Public endpoints

// Get comments for an article
exports.getArticleComments = async (req, res) => {
    try {
        const { articleId } = req.params;
        const comments = await CommentService.getCommentsByArticleId(articleId, false);

        res.status(200).json({
            success: true,
            data: comments,
            count: comments.length
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch comments' 
        });
    }
};

// Create a comment (public - with moderation)
exports.createComment = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { authorName, authorEmail, content, parentCommentId } = req.body;

        // Validate comment data
        const commentData = new Comment(
            parseInt(articleId),
            authorName,
            authorEmail,
            content,
            parentCommentId ? parseInt(parentCommentId) : null,
            'pending' // All public comments start as pending
        );

        if (!commentData.isValid()) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid comment data. Name, valid email, and content (max 2000 chars) are required.' 
            });
        }

        // Create comment
        const comment = await CommentService.createComment({
            articleId: parseInt(articleId),
            parentCommentId: parentCommentId ? parseInt(parentCommentId) : null,
            authorName,
            authorEmail,
            content,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Comment submitted successfully and is awaiting moderation',
            data: comment
        });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to create comment' 
        });
    }
};

// Admin endpoints

// Get all comments (admin)
exports.getAllComments = async (req, res) => {
    try {
        const { status, articleId, page = 1, limit = 50 } = req.query;
        const offset = (page - 1) * limit;

        const filters = {
            status,
            articleId: articleId ? parseInt(articleId) : null,
            limit: parseInt(limit),
            offset: parseInt(offset)
        };

        const result = await CommentService.getAllComments(filters);

        res.status(200).json({
            success: true,
            data: result.comments,
            pagination: {
                total: result.total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(result.total / limit),
                hasMore: result.hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching all comments:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch comments' 
        });
    }
};

// Get comment by ID (admin)
exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await CommentService.getCommentById(id);

        if (!comment) {
            return res.status(404).json({ 
                success: false,
                error: 'Comment not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch comment' 
        });
    }
};

// Update comment status (admin)
exports.updateCommentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected', 'spam'].includes(status)) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid status. Must be: pending, approved, rejected, or spam' 
            });
        }

        const comment = await CommentService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ 
                success: false,
                error: 'Comment not found' 
            });
        }

        const updatedComment = await CommentService.updateCommentStatus(id, status);

        res.status(200).json({
            success: true,
            message: 'Comment status updated successfully',
            data: updatedComment
        });
    } catch (error) {
        console.error('Error updating comment status:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to update comment status' 
        });
    }
};

// Delete comment (admin)
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await CommentService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ 
                success: false,
                error: 'Comment not found' 
            });
        }

        await CommentService.deleteComment(id);

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete comment' 
        });
    }
};

class Comment {
    constructor(articleId, authorName, authorEmail, content, parentCommentId = null, status = 'pending') {
        this.articleId = articleId;
        this.parentCommentId = parentCommentId;
        this.authorName = authorName;
        this.authorEmail = authorEmail;
        this.content = content;
        this.status = status;
    }

    isValid() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            this.articleId && 
            Number.isInteger(this.articleId) &&
            this.authorName && 
            this.authorName.trim().length > 0 &&
            this.authorEmail && 
            emailRegex.test(this.authorEmail) &&
            this.content && 
            this.content.trim().length > 0 &&
            this.content.trim().length <= 2000 // Max 2000 chars
        );
    }

    // Sanitize content (remove potentially harmful HTML)
    static sanitizeContent(content) {
        // Basic sanitization - remove script tags and other dangerous content
        return content
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '')
            .trim();
    }
}

module.exports = Comment;

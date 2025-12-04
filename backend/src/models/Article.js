class Article {
    constructor(title, content, author, excerpt = null, category = null, tags = [], status = 'draft') {
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.author = author;
        this.category = category;
        this.tags = tags;
        this.status = status;
        this.views = 0;
    }

    isValid() {
        const validCategories = ['crédit', 'recouvrement', 'formation'];
        return (
            this.title && 
            this.title.trim().length > 0 &&
            this.content && 
            this.content.trim().length > 0 &&
            this.author && 
            this.author.trim().length > 0 &&
            (!this.category || validCategories.includes(this.category))
        );
    }

    // Sanitize content (basic HTML allowed)
    static sanitizeContent(content) {
        // Allow basic HTML tags for blog content
        // In production, use a library like DOMPurify or sanitize-html
        return content;
    }
}

module.exports = Article;

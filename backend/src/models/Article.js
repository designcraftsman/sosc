class Article {
    constructor(title, slug, content, author, excerpt = null, featuredImage = null, category = null, tags = [], status = 'draft', embeddedVideos = []) {
        this.title = title;
        this.slug = slug;
        this.excerpt = excerpt;
        this.content = content;
        this.author = author;
        this.featuredImage = featuredImage;
        this.category = category;
        this.tags = tags;
        this.status = status;
        this.embeddedVideos = embeddedVideos;
        this.views = 0;
    }

    isValid() {
        return (
            this.title && 
            this.title.trim().length > 0 &&
            this.slug && 
            this.slug.trim().length > 0 &&
            this.content && 
            this.content.trim().length > 0 &&
            this.author && 
            this.author.trim().length > 0
        );
    }

    // Generate slug from title
    static generateSlug(title) {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }

    // Sanitize content (basic HTML allowed)
    static sanitizeContent(content) {
        // Allow basic HTML tags for blog content
        // In production, use a library like DOMPurify or sanitize-html
        return content;
    }

    // Extract YouTube video ID from URL
    static extractYouTubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }

    // Validate embedded video URL
    static isValidEmbeddedVideo(url) {
        // Support YouTube, Vimeo, Dailymotion
        const patterns = [
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
            /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/,
            /^(https?:\/\/)?(www\.)?dailymotion\.com\/.+$/
        ];
        return patterns.some(pattern => pattern.test(url));
    }
}

module.exports = Article;

class Media {
    constructor(filename, originalFilename, filePath, fileType, mimeType, fileSize, uploadedBy) {
        this.filename = filename;
        this.originalFilename = originalFilename;
        this.filePath = filePath;
        this.fileType = fileType; // image, video, document
        this.mimeType = mimeType;
        this.fileSize = fileSize;
        this.uploadedBy = uploadedBy;
        this.width = null;
        this.height = null;
        this.duration = null;
        this.altText = null;
        this.caption = null;
    }

    isValid() {
        return (
            this.filename && 
            this.filename.trim().length > 0 &&
            this.originalFilename && 
            this.originalFilename.trim().length > 0 &&
            this.filePath && 
            this.filePath.trim().length > 0 &&
            this.fileType && 
            ['image', 'video', 'document'].includes(this.fileType) &&
            this.mimeType && 
            this.mimeType.trim().length > 0 &&
            this.fileSize && 
            Number.isInteger(this.fileSize) &&
            this.fileSize > 0
        );
    }

    // Check if file type is allowed
    static isAllowedFileType(mimeType) {
        const allowedTypes = {
            image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
            video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
            document: ['application/pdf']
        };

        return Object.values(allowedTypes).flat().includes(mimeType);
    }

    // Get file type from mime type
    static getFileTypeFromMime(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType === 'application/pdf') return 'document';
        return null;
    }

    // Check file size limits (in bytes)
    static checkFileSize(fileSize, fileType) {
        const limits = {
            image: 5 * 1024 * 1024,    // 5 MB
            video: 100 * 1024 * 1024,  // 100 MB
            document: 10 * 1024 * 1024 // 10 MB
        };

        return fileSize <= limits[fileType];
    }

    // Generate safe filename
    static generateSafeFilename(originalFilename) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const ext = originalFilename.split('.').pop().toLowerCase();
        const safeName = originalFilename
            .split('.')[0]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .substring(0, 50);
        
        return `${safeName}-${timestamp}-${random}.${ext}`;
    }
}

module.exports = Media;

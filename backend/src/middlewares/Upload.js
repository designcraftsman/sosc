const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Media = require('../models/Media');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const safeFilename = Media.generateSafeFilename(file.originalname);
        cb(null, safeFilename);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (Media.isAllowedFileType(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Allowed: images, videos (mp4, webm, ogg), PDF'), false);
    }
};

// Create multer upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB max file size
    }
});

module.exports = upload;

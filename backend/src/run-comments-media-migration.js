const db = require('../config/Db');
const fs = require('fs');
const path = require('path');

const runCommentsMediaMigration = async () => {
    try {
        console.log('Running comments and media migration...');
        
        const sqlFilePath = path.join(__dirname, '../../database/create_blog_comments_media.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        await db.query(sql);
        
        console.log('✅ Comments and media migration completed successfully!');
        console.log('Tables created:');
        console.log('  - blog_comments (with sample data)');
        console.log('  - blog_media');
        console.log('  - embedded_videos column added to blog_articles');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error running migration:', error);
        process.exit(1);
    }
};

runCommentsMediaMigration();

const db = require('../config/Db');
const fs = require('fs');
const path = require('path');

const runBlogMigration = async () => {
    try {
        console.log('Running blog migration...');
        
        const sqlFilePath = path.join(__dirname, '../../database/create_blog_table.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        await db.query(sql);
        
        console.log('✅ Blog migration completed successfully!');
        console.log('Blog articles table created with sample data.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error running blog migration:', error);
        process.exit(1);
    }
};

runBlogMigration();

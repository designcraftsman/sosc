const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'sosc_db',
    user: process.env.DB_USER || 'sosc_user',
    password: process.env.DB_PASSWORD || 'sosc_password'
});

async function runMigration() {
    const client = await pool.connect();
    
    try {
        console.log('Starting blog articles schema update migration...');
        
        // Read the SQL file
        const sqlFilePath = path.join(__dirname, '../database/update_blog_articles_schema.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        // Execute the migration
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        
        console.log('✓ Migration completed successfully!');
        console.log('  - Removed slug column');
        console.log('  - Removed featured_image column');
        console.log('  - Removed embedded_videos column');
        console.log('  - Added category constraint (crédit, recouvrement, formation)');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('✗ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration();

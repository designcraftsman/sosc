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
        console.log('Creating security_logs table...');
        
        // Read the SQL file
        const sqlFilePath = path.join(__dirname, '../database/create_security_logs_table.sql');
        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        
        // Execute the migration
        await client.query(sql);
        
        console.log('✓ Security logs table created successfully!');
        
    } catch (error) {
        console.error('✗ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

runMigration();

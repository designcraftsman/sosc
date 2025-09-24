const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sosc_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function runMigration() {
  try {
    console.log('🔄 Running admin table migration...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'database', 'create_admins_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    
    console.log('✅ Admin table migration completed successfully!');
    console.log('');
    console.log('Default admin credentials:');
    console.log('  Username: admin');
    console.log('  Email: admin@sosc.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('Alternative admin credentials:');
    console.log('  Username: moderator');
    console.log('  Email: moderator@sosc.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change these default passwords in production!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
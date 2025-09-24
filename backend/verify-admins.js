const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sosc_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function verifyAdmins() {
  try {
    console.log('🔍 Checking admin users...\n');
    
    // Get all admins
    const result = await pool.query('SELECT * FROM admins');
    
    if (result.rows.length === 0) {
      console.log('❌ No admin users found!');
      console.log('Please run the migration script first.');
      return;
    }
    
    console.log(`Found ${result.rows.length} admin user(s):`);
    
    for (const admin of result.rows) {
      console.log(`\n👤 Administrator: ${admin.username}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Created: ${admin.created_at}`);
      
      // Test password hash
      const testPassword = 'admin123';
      const isValidHash = await bcrypt.compare(testPassword, admin.password);
      console.log(`   Password test (${testPassword}): ${isValidHash ? '✅ VALID' : '❌ INVALID'}`);
      
      if (!isValidHash) {
        console.log('   🔧 Fixing password hash...');
        const newHash = await bcrypt.hash(testPassword, 12);
        await pool.query('UPDATE admins SET password = $1 WHERE id = $2', [newHash, admin.id]);
        console.log('   ✅ Password hash updated!');
      }
    }
    
    console.log('\n✅ Admin verification completed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

verifyAdmins();
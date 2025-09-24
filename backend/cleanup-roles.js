const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'sosc_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function cleanupRoles() {
  try {
    console.log('🧹 Cleaning up admin roles...\n');
    
    // Update all non-administrator roles to administrator
    const updateResult = await pool.query(`
      UPDATE admins 
      SET role = 'administrator' 
      WHERE role != 'administrator'
      RETURNING id, username, role
    `);
    
    if (updateResult.rows.length > 0) {
      console.log(`✅ Updated ${updateResult.rows.length} admin(s) to 'administrator' role:`);
      updateResult.rows.forEach(admin => {
        console.log(`   - ${admin.username} (ID: ${admin.id})`);
      });
    } else {
      console.log('✅ All admins already have the correct role');
    }
    
    // Show final state
    const allAdmins = await pool.query('SELECT username, email, role FROM admins ORDER BY username');
    console.log('\n📋 Current administrators:');
    allAdmins.rows.forEach(admin => {
      console.log(`   👤 ${admin.username} (${admin.email}) - Role: ${admin.role}`);
    });
    
    console.log('\n✅ Role cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  } finally {
    await pool.end();
  }
}

cleanupRoles();
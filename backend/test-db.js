const pool = require('./src/config/db');

async function testDatabaseConnection() {
    try {
        console.log('Testing database connection...');
        
        // Test basic connection
        const client = await pool.connect();
        console.log('✓ Database connected successfully!');
        
        // Test a simple query
        const result = await client.query('SELECT NOW() as current_time');
        console.log('✓ Query executed successfully');
        console.log('Current time from database:', result.rows[0].current_time);
        
        // Check if table exists
        const tableCheck = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'contact_submissions'
            );
        `);
        
        if (tableCheck.rows[0].exists) {
            console.log('✓ contact_submissions table exists');
            
            // Get table row count
            const countResult = await client.query('SELECT COUNT(*) FROM contact_submissions');
            console.log(`✓ Table has ${countResult.rows[0].count} records`);
        } else {
            console.log('⚠ contact_submissions table does not exist');
            console.log('Please run the SQL script in database/init.sql to create the table');
        }
        
        client.release();
        console.log('✓ Database test completed successfully!');
        
    } catch (error) {
        console.error('✗ Database connection failed:');
        console.error('Error details:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('Make sure PostgreSQL is running on your system');
        } else if (error.code === '3D000') {
            console.error('Database "sosc" does not exist. Please create it first.');
        } else if (error.code === '28P01') {
            console.error('Authentication failed. Check your username and password in .env file');
        }
    } finally {
        await pool.end();
    }
}

testDatabaseConnection();
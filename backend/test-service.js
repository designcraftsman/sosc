const ContactService = require('./src/services/ContactService');

async function testContactService() {
    try {
        console.log('🧪 Testing Contact Service Operations...\n');

        // Test 1: Create a new submission
        console.log('1. Testing createSubmission...');
        const newSubmission = await ContactService.createSubmission(
            'Test User',
            'test@example.com',
            'Test Subject',
            'This is a test message from the service test'
        );
        console.log('✓ Submission created:', {
            id: newSubmission.id,
            name: newSubmission.name,
            email: newSubmission.email,
            subject: newSubmission.subject,
            status: newSubmission.status
        });

        // Test 2: Get all submissions
        console.log('\n2. Testing getAllSubmissions...');
        const allSubmissions = await ContactService.getAllSubmissions();
        console.log(`✓ Found ${allSubmissions.length} submissions`);
        allSubmissions.forEach((submission, index) => {
            console.log(`   ${index + 1}. ID: ${submission.id}, Name: ${submission.name}, Status: ${submission.status}`);
        });

        // Test 3: Get submission by ID
        console.log('\n3. Testing getSubmissionById...');
        const submissionById = await ContactService.getSubmissionById(newSubmission.id);
        if (submissionById) {
            console.log('✓ Submission found by ID:', submissionById.name);
        } else {
            console.log('✗ Submission not found by ID');
        }

        // Test 4: Update submission status
        console.log('\n4. Testing updateSubmissionStatus...');
        const updatedSubmission = await ContactService.updateSubmissionStatus(newSubmission.id, 'read');
        if (updatedSubmission) {
            console.log('✓ Status updated to:', updatedSubmission.status);
        } else {
            console.log('✗ Failed to update status');
        }

        // Test 5: Delete submission (optional - comment out if you want to keep test data)
        console.log('\n5. Testing deleteSubmissionById...');
        const deleted = await ContactService.deleteSubmissionById(newSubmission.id);
        if (deleted) {
            console.log('✓ Submission deleted successfully');
        } else {
            console.log('✗ Failed to delete submission');
        }

        console.log('\n🎉 All tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack trace:', error.stack);
    } finally {
        // Close the database connection
        const pool = require('./src/config/db');
        await pool.end();
    }
}

testContactService();
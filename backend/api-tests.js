// API Test - Test all endpoints manually
// Run your server first: npm start
// Then test these endpoints with tools like Postman or curl

const testData = {
    // Test 1: POST /api/submit-form
    submitForm: {
        method: 'POST',
        url: 'http://localhost:4200/api/submit-form',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Test Subject',
            message: 'This is a test message from API'
        }
    },

    // Test 2: GET /api/contact-submissions
    getAllSubmissions: {
        method: 'GET',
        url: 'http://localhost:4200/api/contact-submissions'
    },

    // Test 3: GET /api/contact-submissions/:id
    getSubmissionById: {
        method: 'GET',
        url: 'http://localhost:4200/api/contact-submissions/1'
    },

    // Test 4: PUT /api/contact-submissions/:id/status
    updateStatus: {
        method: 'PUT',
        url: 'http://localhost:4200/api/contact-submissions/1/status',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            status: 'read'
        }
    },

    // Test 5: DELETE /api/contact-submissions/:id
    deleteSubmission: {
        method: 'DELETE',
        url: 'http://localhost:4200/api/contact-submissions/1'
    }
};

console.log('🧪 API Test Configuration');
console.log('========================\n');

console.log('Before testing, make sure to:');
console.log('1. Start your server: npm start');
console.log('2. Your PostgreSQL server is running');
console.log('3. The contact_submissions table exists\n');

console.log('Test the following endpoints:\n');

console.log('1. Submit Contact Form:');
console.log(`   ${testData.submitForm.method} ${testData.submitForm.url}`);
console.log('   Body:', JSON.stringify(testData.submitForm.body, null, 2));
console.log('');

console.log('2. Get All Submissions:');
console.log(`   ${testData.getAllSubmissions.method} ${testData.getAllSubmissions.url}`);
console.log('');

console.log('3. Get Submission by ID:');
console.log(`   ${testData.getSubmissionById.method} ${testData.getSubmissionById.url}`);
console.log('');

console.log('4. Update Submission Status:');
console.log(`   ${testData.updateStatus.method} ${testData.updateStatus.url}`);
console.log('   Body:', JSON.stringify(testData.updateStatus.body, null, 2));
console.log('');

console.log('5. Delete Submission:');
console.log(`   ${testData.deleteSubmission.method} ${testData.deleteSubmission.url}`);
console.log('');

console.log('Use tools like Postman, Insomnia, or curl to test these endpoints.');

// Export for potential use in automated tests
module.exports = testData;
const MailService = require('./src/services/MailService');

async function testEmailFunctionality() {
    console.log('🧪 Testing Email Service...\n');

    // Test data
    const testSubmission = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'Test Contact Form',
        message: 'This is a test message to verify the email functionality is working correctly.',
        submissionDate: new Date()
    };

    try {
        // Test 1: Send test email
        console.log('1. Testing basic email configuration...');
        const testResult = await MailService.sendTestEmail('test@example.com');
        console.log('Test email result:', testResult.success ? '✅ Success' : '❌ Failed');
        
        if (!testResult.success) {
            console.log('Error:', testResult.error);
        }

        // Test 2: Send admin notification
        console.log('\n2. Testing admin notification email...');
        const adminResult = await MailService.sendAdminNotification(testSubmission);
        console.log('Admin notification result:', adminResult.success ? '✅ Success' : '❌ Failed');
        
        if (!adminResult.success) {
            console.log('Error:', adminResult.error);
        }

        // Test 3: Send client confirmation
        console.log('\n3. Testing client confirmation email...');
        const clientResult = await MailService.sendClientConfirmation(testSubmission);
        console.log('Client confirmation result:', clientResult.success ? '✅ Success' : '❌ Failed');
        
        if (!clientResult.success) {
            console.log('Error:', clientResult.error);
        }

        // Test 4: Send both emails together
        console.log('\n4. Testing combined email sending...');
        const combinedResult = await MailService.sendContactFormEmails(testSubmission);
        console.log('Combined email result:', combinedResult.success ? '✅ Success' : '❌ Failed');
        
        if (!combinedResult.success) {
            console.log('Error:', combinedResult.error);
        }

        console.log('\n📧 Email Service Test Completed!');
        console.log('\nNote: Make sure to update your .env file with correct email credentials:');
        console.log('- EMAIL_HOST (e.g., smtp.gmail.com)');
        console.log('- EMAIL_USER (your email address)');
        console.log('- EMAIL_PASSWORD (your app password)');
        console.log('- ADMIN_EMAIL (where you want to receive notifications)');

    } catch (error) {
        console.error('❌ Email test failed:', error.message);
    }
}

testEmailFunctionality();
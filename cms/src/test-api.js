// Quick test to verify API endpoints are working
const testAPI = async () => {
  try {
    console.log('Testing GET /api/contact-submissions...');
    const response = await fetch('http://localhost:5000/api/contact-submissions');
    const data = await response.json();
    console.log('Response:', data);
    
    if (data.submissions && data.submissions.length > 0) {
      console.log('✅ API is working, found', data.submissions.length, 'submissions');
      
      // Test status update
      const firstSubmission = data.submissions[0];
      console.log('Testing status update for submission ID:', firstSubmission.id);
      
      const updateResponse = await fetch(`http://localhost:5000/api/contact-submissions/${firstSubmission.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });
      
      if (updateResponse.ok) {
        console.log('✅ Status update successful');
      } else {
        console.log('❌ Status update failed');
      }
      
    } else {
      console.log('No submissions found');
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
};

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testAPI();
}
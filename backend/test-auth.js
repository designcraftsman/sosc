// Test script for authentication endpoints
const testAuth = async () => {
  const baseURL = 'http://localhost:5000/api/auth';
  
  try {
    console.log('🧪 Testing authentication endpoints...\n');
    
    // Test login with correct credentials
    console.log('1. Testing login with correct credentials...');
    const loginResponse = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: 'admin',
        password: 'admin123'
      })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', loginData.token.substring(0, 20) + '...');
      console.log('User:', loginData.admin.username);
      
      // Test authenticated endpoint
      console.log('\n2. Testing authenticated endpoint...');
      const meResponse = await fetch(`${baseURL}/me`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      
      if (meResponse.ok) {
        const meData = await meResponse.json();
        console.log('✅ Authenticated request successful!');
        console.log('Admin info:', meData.admin.username, meData.admin.email);
      } else {
        console.log('❌ Authenticated request failed');
      }
      
      // Test contact submissions endpoint
      console.log('\n3. Testing protected contact submissions endpoint...');
      const contactResponse = await fetch('http://localhost:5000/api/contact-submissions', {
        headers: {
          'Authorization': `Bearer ${loginData.token}`
        }
      });
      
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        console.log('✅ Protected endpoint accessible!');
        console.log('Found', contactData.submissions ? contactData.submissions.length : 0, 'submissions');
      } else {
        console.log('❌ Protected endpoint failed:', contactResponse.status);
      }
      
    } else {
      console.log('❌ Login failed:', loginData.error);
    }
    
    // Test login with wrong credentials
    console.log('\n4. Testing login with wrong credentials...');
    const wrongLoginResponse = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: 'admin',
        password: 'wrongpassword'
      })
    });
    
    if (wrongLoginResponse.status === 401) {
      console.log('✅ Wrong credentials properly rejected');
    } else {
      console.log('❌ Wrong credentials should be rejected');
    }
    
    console.log('\n🎉 Authentication test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testAuth();
}

module.exports = { testAuth };
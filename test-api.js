const http = require('http');

console.log('🧪 Testing Thesis Finder API Integration...\n');

// Test endpoints
const tests = [
  {
    name: 'Health Check',
    method: 'GET',
    path: '/health',
    port: 3000,
  },
  {
    name: 'Search API',
    method: 'POST',
    path: '/api/search',
    port: 3000,
    body: {
      query: 'machine learning',
      fieldOfStudy: 'Computer Science',
      limit: 5
    }
  },
  {
    name: 'Auth Register',
    method: 'POST',
    path: '/api/auth/register',
    port: 3000,
    body: {
      email: 'test@example.com',
      password: 'test123456',
      name: 'Test User'
    }
  },
  {
    name: 'AI Service Health',
    method: 'GET',
    path: '/health',
    port: 5000,
  }
];

// Test function
function testAPI(test) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: test.port,
      path: test.path,
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log(`✅ ${test.name} (Port ${test.port})`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Response: ${JSON.stringify(parsed).substring(0, 100)}...`);
        } catch (e) {
          console.log(`✅ ${test.name} (Port ${test.port})`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Response: ${data.substring(0, 100)}...`);
        }
        console.log();
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${test.name} (Port ${test.port})`);
      console.log(`   Error: ${err.message}`);
      console.log();
      resolve();
    });

    if (test.body) {
      req.write(JSON.stringify(test.body));
    }
    req.end();
  });
}

// Run tests
async function runTests() {
  for (const test of tests) {
    await testAPI(test);
  }
  console.log('📊 API Integration Test Complete!');
}

runTests();

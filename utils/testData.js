// Test data for BpmSquare application

const testUsers = {
  validUser: {
    username: process.env.TEST_USERNAME || 'aliyaain0207@gmail.com',
    password: process.env.TEST_PASSWORD || 'sameena123'
  },
  adminUser: {
    username: 'admin@bpmsquare.com',
    password: 'AdminPass123!'
  },
  invalidUser: {
    username: 'invalid@test.com',
    password: 'WrongPassword'
  }
};

const testClients = [
  {
    name: 'Acme Corporation',
    amount: 5000.00,
    description: 'Website Development'
  },
  {
    name: 'Beta Industries',
    amount: 7500.00,
    description: 'Mobile App Development'
  },
  {
    name: 'Gamma Tech',
    amount: 3200.50,
    description: 'API Integration'
  },
  {
    name: 'Delta Solutions',
    amount: 12000.00,
    description: 'Enterprise Implementation'
  }
];

module.exports = {
  testUsers,
  testClients
};

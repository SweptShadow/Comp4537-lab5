// Configuration at the top
const CONFIG = {
    // LOCAL DEPLOYMENT (for testing locally)
    API_BASE_URL: 'http://localhost:3000/api/v1/sql',

    // PRODUCTION DEPLOYMENT (uncomment when deploying to netlify)
    // API_BASE_URL: 'https://your-backend-domain.render.com/api/v1/sql', // Replace with actual backend URL
};

const SAMPLE_PATIENTS = [
    {
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1985-05-15',
        gender: 'Male',
        email: 'john.doe@email.com',
        phone: '555-0101',
        address: '123 Main St, City, State'
    },

    {
        first_name: 'Jane',
        last_name: 'Smith',
        date_of_birth: '1990-08-22',
        gender: 'Female',
        email: 'jane.smith@email.com',
        phone: '555-0102',
        address: '456 Oak Ave, City, State'
    },

    {
        first_name: 'Bob',
        last_name: 'Johnson',
        date_of_birth: '1978-12-03',
        gender: 'Male',
        email: 'bob.johnson@email.com',
        phone: '555-0103',
        address: '789 Pine Rd, City, State'
    }
];
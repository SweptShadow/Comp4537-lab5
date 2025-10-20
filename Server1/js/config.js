// Config
const CONFIG = {
    // LOCAL DEPLOYMENT (for testing locally)
    // API_BASE_URL: 'http://localhost:3000/api/v1/sql',

    // PRODUCTION DEPLOYMENT (for deploying to netlify), backend url on render
    API_BASE_URL: 'https://c4537-lab5-db.onrender.com/api/v1/sql',
};

const SAMPLE_PATIENTS = [
    {
        first_name: 'Sara',
        last_name: 'Brown',
        date_of_birth: '1981-01-01',
        gender: 'Female',
        email: 'sara.brown@email.com',
        phone: '555-0201',
        address: '123 Oak St, City, State'
    },

    {
        first_name: 'John',
        last_name: 'Smith',
        date_of_birth: '1941-01-01',
        gender: 'Male',
        email: 'john.smith@email.com',
        phone: '555-0202',
        address: '456 Pine Ave, City, State'
    },

    {
        first_name: 'Jack',
        last_name: 'Ma',
        date_of_birth: '1961-01-30',
        gender: 'Male',
        email: 'jack.ma@email.com',
        phone: '555-0203',
        address: '789 Cedar Rd, City, State'
    },

    {
        first_name: 'Elon',
        last_name: 'Musk',
        date_of_birth: '1999-01-01',
        gender: 'Male',
        email: 'elon.musk@email.com',
        phone: '555-0204',
        address: '321 Elm Dr, City, State'
    }
];
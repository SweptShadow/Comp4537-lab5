// API Service Class
// Part of code was refined w/ assistance from ChatGPT for fetch API fixing
class APIService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async sendQuery(query, method) {
        try {
            let response;

            if (method === 'GET') {

                const encodedQuery = encodeURIComponent(query);

                response = await fetch(`${this.baseUrl}/${encodedQuery}`, {
                    method: 'GET'
                });
            } else if (method === 'POST') {

                response = await fetch(this.baseUrl, {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: query })
                });
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {

            console.error('API Error:', error);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('CONNECTION_ERROR');
            }
            throw new Error('SERVER_ERROR');
        }
    }
}
// API Service Class
// Part of code was refined w/ assistance from ChatGPT for fetch API fixing
class APIService {

    constructor(baseUrl) {

        this.baseUrl = baseUrl;
    }

    async sendQuery(query, method) {

        if (method === 'GET') {

            const encodedQuery = encodeURIComponent(query);
            const response = await fetch(`${this.baseUrl}/${encodedQuery}`, {
                method: 'GET'
            });

            return await response.json();

        } else if (method === 'POST') {

            const response = await fetch(this.baseUrl, {

                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ query: query })
            });
            
            return await response.json();
        }
    }
}
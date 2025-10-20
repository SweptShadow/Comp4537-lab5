// UI Manager Class
// Part of code was fixed w/ assistance from ChatGPT for UI structure fix (updatePageText).
class UIManager {

    constructor(languageManager) {

        this.responseDiv = document.getElementById('response');
        this.lang = languageManager;
    }

    showResponse(message, isError = false) {
        this.responseDiv.textContent = message;
        this.responseDiv.style.display = 'block';

        if (isError) {
            this.responseDiv.classList.add('error');
        } else {
            this.responseDiv.classList.remove('error');
        }
    }

    getQueryInput() {
        return document.getElementById('sqlQuery').value.trim();
    }

    updatePageText() {
        try {
            // Ensure DOM is ready
            if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
                console.log('DOM not ready, waiting...');
                return;
            }

            // Update page title
            const title = document.querySelector('h1');
            if (title) title.textContent = this.lang.getText('title');

            // Update insert section
            const insertH2 = document.querySelector('.section:first-of-type h2');
            const insertP = document.querySelector('.section:first-of-type p');
            const insertBtn = document.getElementById('insertBtn');

            if (insertH2) insertH2.textContent = this.lang.getText('insertSection.heading');
            if (insertP) insertP.textContent = this.lang.getText('insertSection.description');
            if (insertBtn) insertBtn.textContent = this.lang.getText('insertSection.buttonText');

            // Update query section
            const queryH2 = document.querySelector('.section:last-of-type h2');
            const queryP = document.querySelector('.section:last-of-type p');
            const sqlQuery = document.getElementById('sqlQuery');
            const executeBtn = document.getElementById('executeBtn');

            if (queryH2) queryH2.textContent = this.lang.getText('querySection.heading');
            if (queryP) queryP.textContent = this.lang.getText('querySection.description');
            if (sqlQuery) sqlQuery.placeholder = this.lang.getText('querySection.placeholder');
            if (executeBtn) executeBtn.textContent = this.lang.getText('querySection.buttonText');

            console.log('Page text updated successfully');
        } catch (error) {
            console.error('Error updating page text:', error);
        }
    }
}
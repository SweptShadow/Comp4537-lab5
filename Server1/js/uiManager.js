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
        // Update page title
        document.querySelector('h1').textContent = this.lang.getText('title');

        // Update insert section
        document.querySelector('.section:first-of-type h2').textContent = this.lang.getText('insertSection.heading');
        document.querySelector('.section:first-of-type p').textContent = this.lang.getText('insertSection.description');
        document.getElementById('insertBtn').textContent = this.lang.getText('insertSection.buttonText');

        // Update query section
        document.querySelector('.section:last-of-type h2').textContent = this.lang.getText('querySection.heading');
        document.querySelector('.section:last-of-type p').textContent = this.lang.getText('querySection.description');
        document.getElementById('sqlQuery').placeholder = this.lang.getText('querySection.placeholder');
        document.getElementById('executeBtn').textContent = this.lang.getText('querySection.buttonText');

        // Update attribution
        document.querySelector('.attribution').textContent = this.lang.getText('attribution');
    }
}
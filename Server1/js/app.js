// Application Initialization
class App {
    constructor() {

        this.languageManager = new LanguageManager();
        this.apiService = new APIService(CONFIG.API_BASE_URL);
        this.uiManager = null;
        this.controller = null;
    }

    async initialize() {

        // Load language first
        await this.languageManager.loadLanguage('en');

        // Initialize UI Manager with language support
        this.uiManager = new UIManager(this.languageManager);

        // Update page text with translations
        this.uiManager.updatePageText();

        // Initialize controller
        this.controller = new PatientDatabaseController(

            this.apiService,
            this.uiManager,
            this.languageManager
        );
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {

    const app = new App();
    
    await app.initialize();
});
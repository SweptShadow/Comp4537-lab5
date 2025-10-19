// Language Manager Class
class LanguageManager {

    constructor() {

        this.currentLanguage = 'en';
        this.translations = null;
    }

    async loadLanguage(language = 'en') {

        try {

            const response = await fetch(`./lang/${language}/${language}.json`);

            this.translations = await response.json();
            this.currentLanguage = language;
        } catch (error) {

            console.error('Failed to load language file:', error);

            // Fallback to English if loading fails
            if (language !== 'en') {
                await this.loadLanguage('en');
            }
        }
    }

    getText(key) {

        if (!this.translations) {

            return key; // Return key as fallback
        }

        const keys = key.split('.');
        let current = this.translations;

        for (const k of keys) {
            
            if (current && current[k]) {
                current = current[k];
            } else {
                return key; // Return key as fallback
            }
        }

        return current || key;
    }
}
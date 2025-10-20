// Patient Database Controller Class
class PatientDatabaseController {

    constructor(apiService, uiManager, languageManager) {

        this.apiService = apiService;
        this.uiManager = uiManager;
        this.lang = languageManager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {

        document.getElementById('insertBtn').addEventListener('click', () => {

            this.insertSampleData();
        });

        document.getElementById('executeBtn').addEventListener('click', () => {

            this.executeQuery();
        });
    }

    async insertSampleData() {

        this.uiManager.showResponse(this.lang.getText('messages.inserting'));

        try {

            for (let patientData of SAMPLE_PATIENTS) {

                const patient = new Patient(

                    patientData.first_name,
                    patientData.last_name,
                    patientData.date_of_birth,
                    patientData.gender,
                    patientData.email,
                    patientData.phone,
                    patientData.address
                );

                const query = patient.toInsertQuery();
                const result = await this.apiService.sendQuery(query, 'POST');

                if (!result.success) {

                    throw new Error(result.error || 'Insert failed');
                }
            }

            this.uiManager.showResponse(this.lang.getText('messages.success') + '\n' + this.lang.getText('messages.insertSuccess'));

        } catch (error) {
            console.error('Insert error:', error);
            let errorMessage = this.lang.getText('messages.error') + ' ';

            if (error.message === 'CONNECTION_ERROR') {
                errorMessage += this.lang.getText('messages.connectionError');
            } else if (error.message === 'SERVER_ERROR') {
                errorMessage += this.lang.getText('messages.serverError');
            } else {
                errorMessage += error.message;
            }

            this.uiManager.showResponse(errorMessage, true);
        }
    }

    async executeQuery() {
        const query = this.uiManager.getQueryInput();

        if (!query) {
            this.uiManager.showResponse(this.lang.getText('messages.emptyQuery'), true);
            return;
        }

        if (!QueryValidator.validate(query)) {

            this.uiManager.showResponse(this.lang.getText('messages.invalidQuery'), true);

            return;
        }

        this.uiManager.showResponse(this.lang.getText('messages.executing'));

        try {

            const method = QueryValidator.getQueryType(query);
            const result = await this.apiService.sendQuery(query, method);

            if (result.success) {

                let displayMessage = this.lang.getText('messages.success') + '\n\n';

                if (result.data && Array.isArray(result.data)) {

                    if (result.data.length === 0) {
                        displayMessage += this.lang.getText('messages.noRecords');
                    } else {
                        displayMessage += JSON.stringify(result.data, null, 2);
                    }
                } else if (result.message) {

                    displayMessage += result.message;
                }

                this.uiManager.showResponse(displayMessage);
            } else {
                throw new Error(result.error || 'Query execution failed');
            }

        } catch (error) {
            console.error('Query error:', error);
            let errorMessage = this.lang.getText('messages.error') + ' ';

            if (error.message === 'CONNECTION_ERROR') {
                errorMessage += this.lang.getText('messages.connectionError');
            } else if (error.message === 'SERVER_ERROR') {
                errorMessage += this.lang.getText('messages.serverError');
            } else {
                errorMessage += error.message;
            }

            this.uiManager.showResponse(errorMessage, true);
        }
    }
}
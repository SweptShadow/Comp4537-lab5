// Patient Model Class
class Patient {
    
    constructor(firstName, lastName, dateOfBirth, gender, email, phone, address) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    toInsertQuery() {

        return `INSERT INTO patient (first_name, last_name, date_of_birth, gender, email, phone, address) 
                VALUES ('${this.firstName}', '${this.lastName}', '${this.dateOfBirth}', 
                '${this.gender}', '${this.email}', '${this.phone}', '${this.address}')`;
    }
}
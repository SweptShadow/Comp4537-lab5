# Patient Database Management System

## Lab 5 - Database Integration with SQLite

### Start Up Commands (Local Testing):

1. **Server Side (Backend)**
   ```bash
   cd Server2
   node server.js
   ```

2. **Front End (Client)**
   ```bash
   cd Server1
   python3 -m http.server 8000
   ```

**Extra Info:** Make sure server is running first, then run front end side

### Features:
- SQLite database with patient records
- REST API for database operations
- Secure query validation (blocks UPDATE/DELETE/DROP)
- Support for SELECT and INSERT queries only
- Modular code architecture
- Easy local/production deployment switching

### Database Schema:
- patient_id (Primary Key, Auto-increment)
- first_name, last_name (Text, Required)
- date_of_birth (Date, Required)
- gender (Text with constraints)
- email, phone, address (Text, Optional)
- created_at (Timestamp, Auto-generated)

### Deployment:
See `DEPLOYMENT.md` for detailed deployment instructions for Netlify (frontend) and Render (backend).

### Attribution:
Parts of this code were developed with assistance from ChatGPT for fetch API implementation, UI structure, and database connection setup.

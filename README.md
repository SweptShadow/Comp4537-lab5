# Patient Database Management System

## Local Setup
```bash
# Backend
cd Server2 && node server.js

# Frontend (new terminal)
cd Server1 && python -m http.server 8000
```
Open: http://localhost:8000

## Production URLs
- **Frontend**: https://comp4537lab5s7frontend.netlify.app
- **Backend**: https://c4537-lab5-db.onrender.com

## Features
- SQLite database with patient records
- REST API (GET/POST only)
- Query validation (blocks dangerous SQL)
- Modular architecture

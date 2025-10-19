# Deployment Guide

## Local Testing

### Server2 (Backend)
1. Open terminal in Server2 folder
2. Run: `node server.js`
3. Server will start on http://localhost:3000

### Server1 (Frontend)  
1. Open terminal in Server1 folder
2. Run: `python -m http.server 8000` (or `python3 -m http.server 8000`)
3. Open browser to http://localhost:8000

## Production Deployment

### Step 1: Deploy Server2 (Backend) to Render
1. **Prepare for deployment:**
   - In `Server2/js/config.js`, comment out LOCAL DEPLOYMENT section
   - Uncomment PRODUCTION DEPLOYMENT section
   - Update frontend domain in ALLOWED_ORIGIN after step 2

2. **Deploy to Render:**
   - Create new Web Service on Render.com
   - Connect your GitHub repository
   - Set build command: `cd Server2 && npm install`
   - Set start command: `cd Server2 && node server.js`
   - Deploy and note the backend URL (e.g., https://your-app.render.com)

### Step 2: Deploy Server1 (Frontend) to Netlify
1. **Prepare for deployment:**
   - In `Server1/js/config.js`, comment out LOCAL DEPLOYMENT section
   - Uncomment PRODUCTION DEPLOYMENT section  
   - Replace `https://your-backend-domain.render.com/api/v1/sql` with actual backend URL from step 1

2. **Deploy to Netlify:**
   - Drag and drop Server1 folder to Netlify
   - Or connect GitHub and set publish directory to `Server1`
   - Note the frontend URL (e.g., https://your-app.netlify.app)

### Step 3: Update CORS Configuration
1. **Update Backend CORS:**
   - In `Server2/js/config.js`, replace `https://your-frontend-domain.netlify.app` with actual frontend URL from step 2
   - Redeploy backend on Render

## Quick Configuration Switch

### For Local Testing:
**Server1/js/config.js:**
```javascript
// LOCAL DEPLOYMENT (for testing locally)
API_BASE_URL: 'http://localhost:3000/api/v1/sql',

// PRODUCTION DEPLOYMENT (uncomment when deploying to netlify)
// API_BASE_URL: 'https://your-backend-domain.render.com/api/v1/sql',
```

**Server2/js/config.js:**
```javascript
// LOCAL DEPLOYMENT (for testing locally)
PORT: 3000,
DB_PATH: './patient_database.db',
ALLOWED_ORIGIN: '*',

// PRODUCTION DEPLOYMENT (uncomment when deploying to server)
// PORT: process.env.PORT || 3000,
// DB_PATH: './patient_database.db',
// ALLOWED_ORIGIN: 'https://your-frontend-domain.netlify.app',
```

### For Production:
Just swap the comments in both files and update URLs accordingly.

## Database
- Uses SQLite (patient_database.db file)
- Automatically created when server starts
- No external database service needed
- File persists on Render's filesystem

## Testing URLs Format
- Client: https://your-frontend.netlify.app
- API GET Example: https://your-backend.render.com/api/v1/sql/SELECT%20*%20FROM%20patient
# Deployment Guide

## Render (Backend)
1. Create Web Service → Connect GitHub
2. Set Root Directory: `Server2`
3. Start Command: `node server.js`
4. Get URL (e.g., `https://yourapp.onrender.com`)

## Netlify (Frontend) 
1. Connect GitHub or drag/drop Server1 folder
2. Set Publish Directory: `Server1`
3. Get URL (e.g., `https://yoursite.netlify.app`)

## Config Updates
Update URLs in both config files and redeploy.

**Current Production URLs:**
- Frontend: `https://comp4537lab5s7frontend.netlify.app`
- Backend: `https://c4537-lab5-db.onrender.com`
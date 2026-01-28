# Deployment Guide for Habit App

## Backend Deployment (Render.com - Free Tier)

### 1. Prepare Backend Files
```bash
cd api
# Ensure all dependencies are in package.json
npm install
```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/habbit-app.git
git push -u origin main
```

### 3. Deploy on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in:
   - **Name:** habbit-app-backend
   - **Root Directory:** api
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Set Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
6. Click "Deploy"

Your backend will be live at: `https://habbit-app-backend.onrender.com`

---

## Frontend Deployment (Vercel - Recommended)

### 1. Prepare Frontend
```bash
# In root directory
npm install
```

### 2. Update Environment Variables
Create a `.env.production` file:
```
NEXT_PUBLIC_API_URL=https://habbit-app-backend.onrender.com
```

### 3. Build for Web
```bash
npx expo export --platform web
```

### 4. Deploy on Vercel
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Set Environment Variables:
   - `NEXT_PUBLIC_API_URL`: https://habbit-app-backend.onrender.com
5. Click "Deploy"

Your frontend will be live at: `https://habbit-app.vercel.app`

---

## Alternative: Netlify (Frontend)

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Build settings:
   - **Build command:** `npx expo export --platform web`
   - **Publish directory:** `dist`
5. Set environment variables
6. Deploy

---

## Testing After Deployment

1. Open your Vercel frontend URL
2. Create a habit
3. Verify it appears in the list
4. Test complete, edit, delete, archive functions

---

## Troubleshooting

### CORS Issues
Make sure backend has:
```javascript
app.use(cors());
```

### API Not Found
Check that `NEXT_PUBLIC_API_URL` environment variable is correctly set in Vercel

### Database Connection Issues
Verify MongoDB connection string is correct in Render environment variables

---

## Summary

- **Backend:** https://habbit-app-backend.onrender.com
- **Frontend:** https://habbit-app.vercel.app
- **Database:** MongoDB Atlas (Cloud)

Your app is now live! 🎉

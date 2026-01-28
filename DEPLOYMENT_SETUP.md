# Habit App - Complete Deployment Guide

## Overview
This guide will help you deploy your Habit App (Backend + Frontend) to production.

### Deployment Stack:
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)
- **Database**: MongoDB Atlas (Cloud - already configured)

---

## PART 1: Deploy Backend to Render.com

### Step 1: Prepare Backend for Deployment

Your backend is almost ready! We need to ensure it has:
1. A `Procfile` (specifies how to run the app)
2. Proper environment variables
3. Correct port configuration

### Step 2: Create Procfile (if not exists)

The Procfile tells Render how to start your server:
```
web: node api/index.js
```

**Location**: `/Users/manasrajpur/Desktop/build/habbit-app/Procfile`

### Step 3: Update package.json

Make sure your root `package.json` has:
```json
{
  "name": "habbit-app",
  "version": "1.0.0",
  "engines": {
    "node": "18.x"
  },
  "scripts": {
    "start": "node api/index.js",
    "dev": "node api/index.js"
  }
}
```

### Step 4: Deploy to Render.com

1. Go to **https://render.com** and sign up (free)
2. Click **New +** → **Web Service**
3. Connect your **GitHub repository** (or use Render's GitHub integration)
4. Fill in the details:
   - **Name**: `habbit-app-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node api/index.js`
5. Under **Environment**, add:
   ```
   MONGODB_URI=mongodb+srv://mansingh805:mansingh805@cluster0.vyi8qyq.mongodb.net/habbit-app?retryWrites=true&w=majority
   ```
6. Click **Deploy**

**Your Backend URL will be**: `https://habbit-app-api.onrender.com`

---

## PART 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API Base URL

Update your frontend to use the deployed backend URL.

**File**: `app/home/index.js`

Change the `getApiBase()` function to:
```javascript
const getApiBase = () => {
  if (Platform.OS === "web") {
    return "https://habbit-app-api.onrender.com"; // Your Render backend URL
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000"; // Local testing
  }
  return "http://192.168.31.242:3000"; // Local testing
};
```

### Step 2: Create Vercel Configuration

Create a file: `vercel.json` in your root directory:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "EXPO_PUBLIC_API_URL": "https://habbit-app-api.onrender.com"
  }
}
```

### Step 3: Deploy to Vercel

1. Go to **https://vercel.com** and sign up (free)
2. Click **Import Project**
3. Select your **GitHub repository**
4. Fill in the details:
   - **Project Name**: `habbit-app`
   - **Framework**: `React Native (Expo)`
5. Click **Deploy**

**Your Frontend URL will be**: `https://habbit-app.vercel.app`

---

## PART 3: Update CORS Settings

Your backend needs to allow requests from your frontend domain.

**File**: `api/index.js`

Update the CORS configuration:
```javascript
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:8081",
    "http://192.168.31.242:3000",
    "https://habbit-app.vercel.app" // Add your Vercel URL
  ],
  credentials: true
}));
```

---

## PART 4: Quick Deployment Checklist

- [ ] Backend Procfile created
- [ ] Backend package.json has correct scripts
- [ ] MongoDB connection string verified
- [ ] Backend deployed to Render.com
- [ ] Frontend API URL updated to Render backend
- [ ] CORS settings updated in backend
- [ ] Frontend deployed to Vercel
- [ ] Test creating/fetching habits from deployed URLs

---

## Testing Your Deployment

After deployment:

1. **Test Backend**:
   ```bash
   curl https://habbit-app-api.onrender.com/habitslist
   ```
   Should return a JSON array of habits.

2. **Test Frontend**:
   - Visit `https://habbit-app.vercel.app`
   - Create a new habit
   - Verify it appears in the list
   - Check browser console for any errors

---

## Troubleshooting

### Backend Won't Start
- Check logs on Render dashboard
- Ensure MongoDB connection string is correct
- Verify `node api/index.js` runs locally

### Frontend Shows Blank
- Check Vercel deployment logs
- Verify API URL is correct in frontend
- Check browser console for errors

### CORS Errors
- Add your frontend URL to CORS origin list
- Restart backend after changes

### MongoDB Connection Issues
- Verify connection string in Render environment variables
- Check IP whitelist in MongoDB Atlas (should include 0.0.0.0)

---

## Environment Variables Summary

### Backend (Render.com)
```
MONGODB_URI=mongodb+srv://mansingh805:mansingh805@cluster0.vyi8qyq.mongodb.net/habbit-app?retryWrites=true&w=majority
PORT=3000
```

### Frontend (Vercel)
```
EXPO_PUBLIC_API_URL=https://habbit-app-api.onrender.com
```

---

## Next Steps

After successful deployment:
1. Share your frontend URL: `https://habbit-app.vercel.app`
2. Monitor logs on Render and Vercel dashboards
3. Set up custom domain (optional)
4. Configure CI/CD for auto-deployment on git push

---

## Support

For issues:
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/docs
- MongoDB Support: https://docs.mongodb.com

---

**Deployment Status**: Ready to Deploy ✅

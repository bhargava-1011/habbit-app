# 🎯 Habit Tracker App - Web Deployment Guide

Your app is ready to deploy! Follow these simple steps to get your app live on the internet.

## Quick Start

### Option 1: Easiest Way (Recommended)

#### Backend on Render.com (Free)
1. **Create Render Account**: https://render.com (sign up with GitHub)
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repo** with this folder
4. **Configuration:**
   - Root Directory: `api`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables** (add in Render dashboard):
   ```
   MONGODB_URI=mongodb+srv://mansingh805:mansingh805@cluster0.vyi8qyq.mongodb.net/habbit-app?retryWrites=true&w=majority
   NODE_ENV=production
   ```
6. **Click Deploy** ✅

**Your Backend URL**: `https://habbit-app-backend.onrender.com` (or similar)

---

#### Frontend on Vercel (Free)
1. **Create Vercel Account**: https://vercel.com (sign up with GitHub)
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Configuration:**
   - Root Directory: `.` (or leave empty)
   - Framework: `Expo`
5. **Environment Variables** (add in Vercel):
   ```
   NEXT_PUBLIC_API_URL=https://habbit-app-backend.onrender.com
   ```
   (Replace with your actual Render backend URL)
6. **Click Deploy** ✅

**Your Frontend URL**: `https://habbit-app.vercel.app` (or similar)

---

## Manual Deployment Steps

### 1. Prepare Your Code
```bash
cd /Users/manasrajpur/Desktop/build/habbit-app

# Install dependencies
npm install
cd api && npm install && cd ..
```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Habit App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/habbit-app.git
git push -u origin main
```

### 3. Deploy Backend
- Go to **https://render.com**
- New Web Service
- Connect GitHub
- Set up as above
- Note the URL: `https://your-backend.onrender.com`

### 4. Deploy Frontend
- Go to **https://vercel.com**
- Add Project
- Connect GitHub
- Set `NEXT_PUBLIC_API_URL` to your Render URL
- Deploy

---

## What Gets Deployed?

### Backend (`/api`)
- Express.js server
- MongoDB connection
- REST API endpoints:
  - `GET /habitslist` - Fetch all habits
  - `POST /habits` - Create new habit
  - `PUT /habits/:id/completed/:day` - Mark complete
  - `DELETE /habits/:id` - Delete habit
  - `PATCH /habits/:id` - Archive habit

### Frontend
- React Native Web app (Expo)
- Home page with habit list
- Create habit page
- All CRUD operations

---

## Verify Deployment

### Check Backend
```bash
curl https://your-backend.onrender.com/habitslist
```

You should see a JSON array of habits (empty `[]` is normal at first)

### Check Frontend
Open your Vercel URL in browser → You should see your habit app!

---

## Common Issues & Solutions

### ❌ CORS Error
**Problem**: Frontend can't reach backend
**Solution**: 
- Check `NEXT_PUBLIC_API_URL` in Vercel matches your Render URL exactly
- Make sure backend has `cors()` middleware enabled

### ❌ "Cannot find module" 
**Problem**: Missing dependencies
**Solution**:
```bash
cd api && npm install && cd ..
```

### ❌ MongoDB Connection Failed
**Problem**: Can't connect to database
**Solution**:
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist: https://cloud.mongodb.com
- Add `0.0.0.0/0` (allows all IPs)

### ❌ 404 Not Found
**Problem**: Endpoints not working
**Solution**:
- Backend might not be running
- Check Render logs for errors
- Verify port is `process.env.PORT || 3000`

---

## Environment Files

### Backend (`api/.env`)
```
MONGODB_URI=your_mongodb_uri
PORT=3000
NODE_ENV=production
```

### Frontend (`.env.production`)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## Monitoring & Logs

### View Backend Logs (Render)
1. Go to your Render service
2. Click "Logs" tab
3. See real-time server logs

### View Frontend Logs (Vercel)
1. Go to your Vercel project
2. Click "Deployments"
3. Click latest deployment → "Logs"

---

## Performance Tips

1. **Enable caching**: Render will cache dependencies
2. **Optimize database**: MongoDB Atlas auto-scales
3. **Use CDN**: Vercel includes automatic CDN
4. **Monitor**: Check error logs regularly

---

## Update & Redeploy

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Both Render and Vercel will automatically redeploy! 🚀

---

## Costs

- **Render Backend**: Free tier available (up to 750 hours/month)
- **Vercel Frontend**: Free tier available
- **MongoDB Atlas**: Free tier (512 MB storage)
- **Total**: $0/month for your initial deployment! 💰

---

## Next Steps

1. ✅ Deploy backend on Render
2. ✅ Deploy frontend on Vercel
3. ✅ Test all features work
4. ✅ Add custom domain (optional)
5. ✅ Enable HTTPS (automatic)
6. ✅ Monitor performance

---

## Support

For issues:
- **Backend**: Check Render logs
- **Frontend**: Check Vercel logs
- **Database**: Check MongoDB Atlas dashboard

Good luck! 🚀 Your app is about to go live!

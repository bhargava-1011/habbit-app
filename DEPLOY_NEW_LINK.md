# 🚀 Deploy App with New Links - Complete Guide

## 🎯 Goal: Deploy Your Habit Tracker with Reminder Features

This guide will help you deploy your app and get **new deployment links** for both backend and frontend.

---

## 📋 What You'll Get

After following this guide, you'll have:
- ✅ **New Backend Link**: `https://your-app-backend.onrender.com`
- ✅ **New Frontend Link**: `https://your-app.vercel.app`
- ✅ Live reminder features with time picker and notifications
- ✅ Automatic deployments on future code pushes

---

## ⏱️ Time Required

- **Backend Setup**: 5-7 minutes
- **Frontend Setup**: 3-5 minutes
- **Testing**: 2-3 minutes
- **Total**: ~15 minutes

---

## 🔑 Prerequisites

Before you start, make sure you have:
1. ✅ GitHub account with access to `bhargava-1011/habbit-app`
2. ✅ MongoDB connection string (from MongoDB Atlas)
3. ✅ Email account for Render.com signup (if new)
4. ✅ Email account for Vercel.com signup (if new)

---

## 🎬 PART 1: Deploy Backend (Get Backend Link)

### Step 1.1: Sign Up / Log In to Render.com

1. Go to: **https://render.com**
2. Click **"Get Started"** or **"Sign In"**
3. Choose: **"Sign in with GitHub"** (easiest)
4. Authorize Render to access your GitHub repos

### Step 1.2: Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your repository:
   - Find: `bhargava-1011/habbit-app`
   - Click **"Connect"**

### Step 1.3: Configure Backend Service

Fill in these settings:

**Basic Settings:**
- **Name**: `habbit-app-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` ⚠️ Important: Select `main` branch
- **Root Directory**: `api` ⚠️ Important: Must be `api`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select: **Free** (for testing)

### Step 1.4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these:

```
MONGODB_URI = <your-mongodb-connection-string>
PORT = 10000
NODE_ENV = production
```

**Getting MongoDB Connection String:**
1. Go to: https://cloud.mongodb.com
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `myFirstDatabase` with `habbit-app` or your db name

Example:
```
MONGODB_URI=******cluster0.abc123.mongodb.net/habbit-app?retryWrites=true&w=majority
```

### Step 1.5: Deploy Backend

1. Click **"Create Web Service"** at bottom
2. Wait 2-3 minutes for deployment
3. Watch the logs for **"✓ Connected to MongoDB successfully"**
4. Once deployed, you'll see: **"Your service is live 🎉"**

### Step 1.6: Copy Your Backend URL

At the top of the page, you'll see your backend URL:
```
https://habbit-app-backend.onrender.com
```
or
```
https://habbit-app-backend-xyz123.onrender.com
```

**📝 SAVE THIS URL - You'll need it for frontend!**

### Step 1.7: Test Backend

Click on the URL or run:
```bash
curl https://your-backend.onrender.com
```

You should see:
```json
{"message":"Habit Tracker API is running","status":"OK","timestamp":"..."}
```

✅ **Backend Deployed!** You now have your **new backend link**!

---

## 🎬 PART 2: Deploy Frontend (Get Frontend Link)

### Step 2.1: Sign Up / Log In to Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose: **"Continue with GitHub"** (easiest)
4. Authorize Vercel to access your GitHub repos

### Step 2.2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `bhargava-1011/habbit-app`
3. Click **"Import"**

### Step 2.3: Configure Frontend

**Project Settings:**
- **Project Name**: `habbit-app` (or customize)
- **Framework Preset**: Detect automatically (should be "Other" or "Expo")
- **Root Directory**: `.` (leave as root - do NOT set to api)
- **Build Command**: Leave default or `npm run build`
- **Output Directory**: Leave default

### Step 2.4: Add Environment Variable

**CRITICAL STEP:**

Before clicking Deploy, add environment variable:

1. Expand **"Environment Variables"** section
2. Add:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://your-backend.onrender.com
   ```
   ⚠️ Use YOUR backend URL from Step 1.6!

3. Select: **Production**, **Preview**, **Development** (all three)

### Step 2.5: Deploy Frontend

1. Click **"Deploy"** button
2. Wait 2-5 minutes for build and deployment
3. Watch the build logs
4. Once done, you'll see: **"Congratulations!"**

### Step 2.6: Get Your Frontend URL

You'll see your new frontend URL:
```
https://habbit-app.vercel.app
```
or
```
https://habbit-app-xyz123.vercel.app
```

**📝 SAVE THIS URL - This is your live app!**

### Step 2.7: Visit Your Live App

Click on the URL to open your app!

✅ **Frontend Deployed!** You now have your **new frontend link**!

---

## 🎬 PART 3: Merge Code to Main (Important!)

⚠️ **Important:** The code needs to be on `main` branch for Vercel to deploy correctly.

### Option A: Using GitHub UI (Recommended)

1. Go to: https://github.com/bhargava-1011/habbit-app
2. Click **"Pull requests"**
3. Click **"New pull request"**
4. Set: Base: `main` ← Compare: `copilot/run-my-code-task`
5. Click **"Create pull request"**
6. Add title: "Add reminder and alarm functionality"
7. Click **"Create pull request"**
8. Click **"Merge pull request"**
9. Click **"Confirm merge"**

Vercel will automatically redeploy with the new code!

### Option B: Using Command Line

```bash
cd /path/to/habbit-app

# Switch to main
git checkout main || git checkout -b main

# Merge feature branch
git merge copilot/run-my-code-task --no-edit

# Push to GitHub
git push origin main
```

Vercel will automatically redeploy!

---

## ✅ PART 4: Verify Deployment

### Test Backend

```bash
# Test health endpoint
curl https://your-backend.onrender.com

# Test habits endpoint
curl https://your-backend.onrender.com/habitslist
```

### Test Frontend

1. Visit: `https://your-app.vercel.app`
2. Click **"+"** to create a habit
3. Enable **"Reminder"** toggle ✓
4. Click time picker - see **"🕐 09:00"**
5. Set a time
6. Save habit
7. See bell icon **🔔** with time on card
8. Tap habit to open modal
9. See **"🔔 Reminder: XX:XX"** button
10. Expand to see reminder settings

✅ **If all tests pass, your app is LIVE!**

---

## 🌐 Your New Links

After deployment, share these:

**Your Live App (Frontend):**
```
https://your-app.vercel.app
```

**Your API Backend:**
```
https://your-backend.onrender.com
```

---

## 🔄 Future Deployments (Automatic!)

After this initial setup, future deployments are **automatic**:

1. Make code changes
2. Push to `main` branch:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Vercel **automatically** deploys frontend (2-3 min)
4. Render **automatically** deploys backend (2-3 min)

No manual steps needed! 🎉

---

## 🐛 Troubleshooting

### Backend Issues

**Issue: Backend won't start**
- Check MongoDB URI is correct
- Check MongoDB IP whitelist includes `0.0.0.0/0` (allow all)
- Check Render logs for errors

**Issue: Can't connect to MongoDB**
- In MongoDB Atlas, go to Network Access
- Click "Add IP Address"
- Click "Allow Access from Anywhere"
- Click "Confirm"

### Frontend Issues

**Issue: Frontend can't connect to backend**
- Verify `NEXT_PUBLIC_API_URL` is set in Vercel
- Check the URL has no trailing slash
- Check backend URL is accessible
- Redeploy frontend after fixing

**Issue: Reminder features not showing**
- Verify code is merged to `main` branch
- Check Vercel is deploying from `main` branch
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

### Deployment Issues

**Issue: Render deployment fails**
- Check `api/Procfile` exists
- Verify `Root Directory` is set to `api`
- Check build logs for errors

**Issue: Vercel deployment fails**
- Check package.json is valid
- Verify dependencies are installed
- Check build logs for errors
- Try redeploying

---

## 💡 Pro Tips

1. **Use Custom Domains (Optional):**
   - Render: Add custom domain in service settings
   - Vercel: Add custom domain in project settings

2. **Monitor Your Apps:**
   - Render Dashboard: See logs and metrics
   - Vercel Dashboard: See deployments and analytics

3. **Environment Variables:**
   - Never commit `.env` files to Git
   - Update environment variables in dashboards
   - Redeploy after changing environment variables

4. **Free Tier Limitations:**
   - Render Free: Backend sleeps after 15 min inactivity
   - First request after sleep takes 30-60 seconds
   - Consider upgrading for production

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## 🎉 Congratulations!

You now have:
- ✅ New backend deployed at Render
- ✅ New frontend deployed at Vercel
- ✅ Full reminder & alarm functionality live
- ✅ Automatic deployments on future pushes

Share your new links and enjoy your deployed app! 🚀

---

## 📞 Need Help?

- Check: `TROUBLESHOOTING.md` for common issues
- Check: `DEPLOYMENT_STATUS.md` for detailed guides
- Check: `QUICK_REFERENCE.md` for quick commands

---

**Your App is Live!** 🌟

Frontend: `https://your-app.vercel.app`  
Backend: `https://your-backend.onrender.com`

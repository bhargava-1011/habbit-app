# ✅ Deployment Checklist - Get New Links

## Before You Start
- [ ] GitHub account ready
- [ ] MongoDB connection string ready
- [ ] 15 minutes available

---

## Part 1: Backend (Render.com) - 5 min

- [ ] Go to https://render.com
- [ ] Sign in with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect `bhargava-1011/habbit-app`
- [ ] Set Name: `habbit-app-backend` (or custom)
- [ ] Set Branch: `main` ⚠️
- [ ] Set Root Directory: `api` ⚠️
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add Environment Variable:
  ```
  MONGODB_URI = <your-connection-string>
  PORT = 10000
  NODE_ENV = production
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 min)
- [ ] Copy backend URL: `https://_____________.onrender.com`

**Backend URL:** _________________________________

---

## Part 2: Frontend (Vercel.com) - 3 min

- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import `bhargava-1011/habbit-app`
- [ ] Set Project Name: `habbit-app` (or custom)
- [ ] Add Environment Variable:
  ```
  NEXT_PUBLIC_API_URL = <your-backend-url-from-above>
  ```
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-5 min)
- [ ] Copy frontend URL: `https://_____________.vercel.app`

**Frontend URL:** _________________________________

---

## Part 3: Merge to Main - 2 min

**Option A: GitHub UI**
- [ ] Go to https://github.com/bhargava-1011/habbit-app/pulls
- [ ] Click "New pull request"
- [ ] Base: `main` ← Compare: `copilot/run-my-code-task`
- [ ] Click "Create pull request"
- [ ] Click "Merge pull request"
- [ ] Click "Confirm merge"
- [ ] Wait for Vercel to redeploy (2 min)

**OR Option B: Command Line**
```bash
git checkout main || git checkout -b main
git merge copilot/run-my-code-task --no-edit
git push origin main
```

---

## Part 4: Test - 2 min

- [ ] Visit your frontend URL
- [ ] Click "+" to create habit
- [ ] Enter habit name
- [ ] Enable "Reminder" toggle
- [ ] Click time picker (should show "🕐 09:00")
- [ ] Set a custom time
- [ ] Click "SAVE"
- [ ] Verify bell icon 🔔 appears on card
- [ ] Tap habit to open modal
- [ ] See "🔔 Reminder: XX:XX" button
- [ ] Expand to test reminder settings

---

## ✅ Success Checklist

- [ ] Backend is running (green status in Render)
- [ ] Frontend is live (shows in Vercel)
- [ ] Can create habits
- [ ] Reminder toggle works
- [ ] Time picker works
- [ ] Bell icon shows on cards
- [ ] Modal reminder settings work

---

## 🎉 Deployment Complete!

**Your New Links:**

Frontend: https://_________________________________.vercel.app

Backend: https://_________________________________.onrender.com

---

## 📝 Notes / Issues

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________

---

## 🔄 Future Deployments

To update your app:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel and Render will auto-deploy! (2-5 min)

---

**Total Time:** _________ minutes

**Status:** [ ] Success  [ ] Issues (see notes above)

---

Need help? See:
- DEPLOY_NEW_LINK.md (detailed guide)
- TROUBLESHOOTING.md (solutions)

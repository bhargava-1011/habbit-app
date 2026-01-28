# ⚡ Quick Deploy - Get New Links NOW

## 🎯 Goal: Deploy and get NEW deployment links in 15 minutes

---

## 🚀 Step 1: Deploy Backend (5 min) → Get Backend Link

1. **Go to:** https://render.com
2. **Sign in** with GitHub
3. **New +** → **Web Service**
4. **Connect:** `bhargava-1011/habbit-app`
5. **Configure:**
   - Name: `habbit-app-backend`
   - Branch: `main` ⚠️
   - Root Directory: `api` ⚠️
   - Build: `npm install`
   - Start: `npm start`
6. **Environment Variables:**
   ```
   MONGODB_URI = <your-mongodb-connection-string>
   PORT = 10000
   NODE_ENV = production
   ```
7. **Create Web Service**
8. **Copy your URL:** `https://habbit-app-backend-xyz.onrender.com` 📝

---

## 🚀 Step 2: Deploy Frontend (3 min) → Get Frontend Link

1. **Go to:** https://vercel.com
2. **Sign in** with GitHub
3. **Add New** → **Project**
4. **Import:** `bhargava-1011/habbit-app`
5. **Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
   ```
   ⚠️ Use YOUR backend URL from Step 1!
6. **Deploy**
7. **Copy your URL:** `https://habbit-app-xyz.vercel.app` 📝

---

## 🚀 Step 3: Merge to Main (2 min)

**GitHub UI:**
1. Go to: https://github.com/bhargava-1011/habbit-app/pulls
2. New PR: `copilot/run-my-code-task` → `main`
3. Create → Merge

**OR Command Line:**
```bash
git checkout main || git checkout -b main
git merge copilot/run-my-code-task
git push origin main
```

Vercel will auto-redeploy with new code!

---

## ✅ Step 4: Test (2 min)

Visit: `https://your-app.vercel.app`

1. Create habit ✓
2. Enable reminder ✓
3. Set time ✓
4. See bell icon 🔔 ✓

---

## 🎉 Done! Your New Links:

**Frontend:** `https://your-app.vercel.app`  
**Backend:** `https://your-backend.onrender.com`

---

## 🐛 Problems?

**Backend won't start:**
- MongoDB URI correct?
- MongoDB IP whitelist: Allow `0.0.0.0/0`

**Frontend can't connect:**
- `NEXT_PUBLIC_API_URL` set in Vercel?
- Backend URL correct?

**Features not showing:**
- Code merged to `main`?
- Clear browser cache (Ctrl+Shift+R)

---

## 📚 Need Detailed Guide?

See: `DEPLOY_NEW_LINK.md` for complete step-by-step instructions!

---

**Total Time: ~15 minutes** ⏱️

**Your app will be LIVE!** 🚀

# 🎯 Quick Reference - Deployment

## ✅ All Files Ready!

### Configuration Files Created:
- ✅ `api/Procfile` - Render server configuration
- ✅ `api/.env.example` - Backend environment template
- ✅ `.env.example` - Frontend environment template
- ✅ `vercel.json` - Vercel build configuration
- ✅ `DEPLOYMENT_STATUS.md` - Complete deployment guide
- ✅ `TROUBLESHOOTING.md` - Error solutions

---

## 🚀 Two Deployment Options

### Option 1: Auto-Deploy Script
```bash
./deploy.sh
```
This merges to main and triggers Vercel auto-deploy.

### Option 2: Manual Deploy to Render + Vercel
See `DEPLOYMENT_STATUS.md` for full guide (8-10 minutes)

---

## ⚡ Quick Deploy Steps

### Backend (Render.com) - 5 min
1. Go to https://render.com
2. New Web Service → Connect GitHub
3. Root Directory: `api`
4. Build: `npm install`, Start: `npm start`
5. Environment: `MONGODB_URI=<your-mongo-url>`
6. Deploy → Copy backend URL

### Frontend (Vercel.com) - 3 min
1. Go to https://vercel.com
2. Import GitHub project
3. Environment: `NEXT_PUBLIC_API_URL=<render-backend-url>`
4. Deploy!

---

## 📝 Environment Variables

### Backend (Render)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/habbit-app
PORT=3000
NODE_ENV=production
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🔧 Common Issues

### "command not found: deploy.sh"
**Solution:** Use `./deploy.sh` (with `./`)

### Backend won't start
**Check:** MongoDB connection string & IP whitelist

### Frontend can't connect
**Check:** NEXT_PUBLIC_API_URL is correct in Vercel

See `TROUBLESHOOTING.md` for more help!

---

## 📚 Documentation

- `DEPLOYMENT_STATUS.md` - Complete guide ⭐
- `TROUBLESHOOTING.md` - Error solutions
- `DEPLOYMENT.md` - Detailed instructions
- `REMINDER_FEATURE.md` - Feature details

---

## ✨ What You Get

After deployment:
- ⏰ Time picker for reminders
- 🔔 Bell icon with time on cards
- 📱 Daily notifications
- ⚙️ Modal reminder settings
- 🌍 Live at habbit-app.vercel.app

---

**Ready? Run `./deploy.sh` or see DEPLOYMENT_STATUS.md!**

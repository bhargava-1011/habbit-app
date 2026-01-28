# 📋 Deployment Checklist

## Pre-Deployment (Local Testing)

- [x] Backend API working locally (port 3000)
- [x] Frontend loading on web (npm start)
- [x] MongoDB connection successful
- [x] Create habit works
- [x] Read habits displays correctly
- [x] Update habit works
- [x] Delete habit works
- [x] No console errors
- [x] Responsive design tested

## Code Preparation

- [ ] All dependencies in package.json (root and api/)
- [ ] Environment variables configured locally
- [ ] No hardcoded credentials in code
- [ ] .gitignore includes node_modules/
- [ ] .gitignore includes .env files
- [ ] No console.log() spam
- [ ] Error handling implemented
- [ ] CORS properly configured

## GitHub Setup

- [ ] Create new GitHub repository
- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit"`
- [ ] Create main branch: `git branch -M main`
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/habbit-app`
- [ ] Push: `git push -u origin main`
- [ ] Verify on GitHub (all files present)

## Render Backend Deployment

### Account & Project Setup
- [ ] Create Render account (https://render.com)
- [ ] Sign up with GitHub
- [ ] Connect GitHub account to Render
- [ ] Create new Web Service

### Configuration
- [ ] Select GitHub repository
- [ ] Set Root Directory: `api`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Set Region: Default (or nearest to you)
- [ ] Set Plan: Free

### Environment Variables
- [ ] Add MONGODB_URI
  ```
  mongodb+srv://mansingh805:mansingh805@cluster0.vyi8qyq.mongodb.net/habbit-app?retryWrites=true&w=majority
  ```
- [ ] Add NODE_ENV: `production`
- [ ] Verify all variables added

### Deployment
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (5-10 min)
- [ ] Check deployment logs for errors
- [ ] Verify "Deployed" status
- [ ] Copy backend URL: `https://habbit-app-backend.onrender.com` (or similar)
- [ ] Test backend: `curl https://your-backend/habitslist`

## Vercel Frontend Deployment

### Account & Project Setup
- [ ] Create Vercel account (https://vercel.com)
- [ ] Sign up with GitHub
- [ ] Connect GitHub account to Vercel
- [ ] Click "Add New Project"

### Configuration
- [ ] Import your GitHub repository
- [ ] Select root directory: `.` (or leave empty)
- [ ] Framework: Expo
- [ ] Build command: Auto-detected
- [ ] Output directory: Auto-detected

### Environment Variables
- [ ] Add NEXT_PUBLIC_API_URL
  ```
  https://your-backend.onrender.com
  ```
  (Replace with your actual Render URL)
- [ ] Click "Deploy"

### Deployment
- [ ] Wait for build to complete (3-5 min)
- [ ] Check build logs for errors
- [ ] Verify "Deployment Successful"
- [ ] Copy frontend URL: `https://habbit-app.vercel.app` (or similar)

## Post-Deployment Testing

### Backend Testing
- [ ] Test /habitslist endpoint
  ```bash
  curl https://your-backend.onrender.com/habitslist
  ```
- [ ] Should return JSON array (empty or with habits)

### Frontend Testing
- [ ] Open frontend URL in browser
- [ ] Home page loads without errors
- [ ] No CORS errors in console
- [ ] Can create new habit
- [ ] Habit appears in list
- [ ] Can complete habit
- [ ] Can edit habit
- [ ] Can delete habit
- [ ] Can archive habit
- [ ] Refresh page - habits still visible

### Full Flow Testing
- [ ] Create habit on frontend
- [ ] Check it saved in MongoDB
- [ ] Fetch from /habitslist
- [ ] Verify data matches
- [ ] Edit habit - verify update
- [ ] Delete habit - verify removal
- [ ] Create multiple habits
- [ ] Filter by Today/Weekly/Monthly

## Monitoring & Logs

### Check Render Logs
- [ ] Go to https://dashboard.render.com
- [ ] Select your backend service
- [ ] Click "Logs"
- [ ] Should see "Server is running on port 3000"
- [ ] No errors displayed

### Check Vercel Logs
- [ ] Go to https://vercel.com
- [ ] Select your project
- [ ] Click "Deployments"
- [ ] Click latest deployment
- [ ] Check build logs - should say "✓ Built successfully"

### Monitor MongoDB
- [ ] Go to https://cloud.mongodb.com
- [ ] Select your cluster
- [ ] Check connection status: "Connected"
- [ ] Monitor query performance
- [ ] Check storage usage

## Custom Domain (Optional)

- [ ] Buy custom domain (Namecheap, GoDaddy, etc.)
- [ ] Add domain to Vercel
- [ ] Update DNS records per Vercel instructions
- [ ] Wait 24-48 hours for propagation
- [ ] Test custom domain: `https://yourdomain.com`

## Performance Optimization

- [ ] Enable Render auto-scaling (if paid)
- [ ] Enable Vercel performance analytics
- [ ] Check page load time
- [ ] Optimize images
- [ ] Cache static assets
- [ ] Monitor API response times

## Security Checklist

- [ ] No credentials in code
- [ ] Environment variables configured
- [ ] HTTPS enabled (automatic)
- [ ] CORS properly configured
- [ ] MongoDB IP whitelist set (0.0.0.0/0 for testing)
- [ ] Consider rate limiting
- [ ] Input validation on backend
- [ ] Error messages don't leak info

## Documentation

- [ ] README.md explains setup
- [ ] DEPLOYMENT_EASY.md created
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] Troubleshooting guide created

## Backup & Recovery

- [ ] MongoDB automated backups enabled
- [ ] GitHub repository has all code
- [ ] .env backed up securely (not in Git)
- [ ] Know how to restore from backup
- [ ] Know how to rollback deployment

## Final Verification

- [ ] Frontend URL works: https://habbit-app.vercel.app
- [ ] Backend URL works: https://habbit-app-backend.onrender.com
- [ ] API calls succeed (check Network tab)
- [ ] All CRUD operations work
- [ ] Database persists data
- [ ] No console errors
- [ ] Response times acceptable (< 500ms)
- [ ] Mobile responsive
- [ ] Tested on different browsers

## Post-Launch

- [ ] Monitor logs daily for first week
- [ ] Check user feedback
- [ ] Monitor error rates
- [ ] Monitor database performance
- [ ] Plan scaling if needed
- [ ] Set up alerts for errors
- [ ] Document any issues found
- [ ] Create update plan for fixes

---

## Deployment Success Indicators

✅ All items checked above
✅ Frontend and backend deployed
✅ App accessible from web browser
✅ All features working
✅ Database storing data
✅ No critical errors
✅ Response times good
✅ Ready for users!

---

## Quick Links

- Frontend: https://habbit-app.vercel.app
- Backend: https://habbit-app-backend.onrender.com
- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub: https://github.com/YOUR_USERNAME/habbit-app

---

## Emergency Contacts

- Render Support: https://render.com/support
- Vercel Support: https://vercel.com/support
- MongoDB Support: https://support.mongodb.com

---

🎉 Congratulations! Your app is deployed!

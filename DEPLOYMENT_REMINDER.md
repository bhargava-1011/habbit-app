# Deployment Guide - Reminder Feature

## Prerequisites
- GitHub repository connected to Vercel
- Backend API deployed and accessible
- MongoDB database configured

## Step 1: Update Backend (if needed)

If your backend is separate from the frontend:

1. Deploy the updated `api/index.js` with the new schema
2. Ensure the MongoDB connection is working
3. Test the endpoints:
   ```bash
   curl https://your-backend-url/habitslist
   ```

## Step 2: Deploy to Vercel

### Option A: Automatic Deployment (Recommended)

1. **Push Changes to GitHub**:
   ```bash
   git push origin main
   ```

2. **Vercel Auto-Deploy**:
   - Vercel will automatically detect the push
   - Build will start automatically
   - Check deployment status at: https://vercel.com/dashboard

### Option B: Manual Deployment

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add/Update:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
   ```
4. Redeploy if needed

## Step 4: Verify Deployment

1. **Visit Your App**:
   ```
   https://habbit-app.vercel.app/
   ```

2. **Test Reminder Creation**:
   - Create a new habit
   - Enable reminder toggle
   - Select a time
   - Save the habit

3. **Check Notification Permissions**:
   - Browser should prompt for notification permissions
   - Accept the permissions

4. **Verify API Connection**:
   - Open browser console (F12)
   - Check for API calls
   - Verify no CORS errors

## Step 5: Testing Checklist

### Create Habit
- [ ] Reminder toggle appears
- [ ] Time picker opens when toggled
- [ ] Time can be selected
- [ ] Default time is 09:00
- [ ] Habit saves with reminder time

### View Habits
- [ ] Bell icon appears for habits with reminders
- [ ] Reminder time displays correctly
- [ ] Format is "Daily • 🔔 HH:MM"

### Habit Modal
- [ ] Reminder button shows in modal
- [ ] Current reminder status displays
- [ ] Can toggle reminder on/off
- [ ] Time displays correctly

### Notifications
- [ ] Permission prompt appears
- [ ] Can accept/deny permissions
- [ ] No errors in console

## Troubleshooting

### Issue: App doesn't load
**Solution**: Check browser console for errors
- Verify API URL is correct
- Check CORS configuration

### Issue: Time picker doesn't appear
**Solution**: 
- Check if `@react-native-community/datetimepicker` is installed
- Verify import statement in create.js
- Check browser compatibility

### Issue: Notifications don't work
**Solution**:
- Web notifications require HTTPS
- Check if permissions were granted
- Verify expo-notifications is installed
- Check app.json configuration

### Issue: API errors
**Solution**:
- Verify `NEXT_PUBLIC_API_URL` is set
- Check backend is running
- Verify MongoDB connection
- Check network tab for API calls

### Issue: Build fails
**Solution**:
```bash
# Clear cache and rebuild
rm -rf node_modules
rm -rf .expo
npm install
npm run web
```

## Post-Deployment

### 1. Monitor Logs
- Check Vercel deployment logs
- Monitor error tracking
- Review user feedback

### 2. Performance
- Test on different devices
- Check mobile responsiveness
- Verify notification timing

### 3. User Communication
- Announce new feature
- Provide usage instructions
- Gather user feedback

## Rollback Plan

If issues occur:

1. **Quick Rollback**:
   ```bash
   vercel rollback
   ```

2. **Or via Dashboard**:
   - Go to Vercel dashboard
   - Select previous deployment
   - Click "Promote to Production"

## Environment-Specific Notes

### Production
- Use production API URL
- Enable analytics
- Monitor performance

### Staging
- Test new features
- Use staging API
- Limited users

### Development
- Use localhost API
- Hot reload enabled
- Full logging

## Security Checklist

- [ ] No hardcoded credentials
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] API endpoints secured
- [ ] User permissions handled

## Success Criteria

✅ App loads without errors
✅ Reminder toggle works
✅ Time picker functions correctly
✅ Habits save with reminder time
✅ Notifications prompt appears
✅ No console errors
✅ Mobile responsive
✅ API calls successful

## Support

For issues:
1. Check deployment logs in Vercel
2. Review browser console
3. Test API endpoints directly
4. Check GitHub Actions (if configured)

## Next Steps

After successful deployment:
1. Test on multiple devices
2. Gather user feedback
3. Monitor analytics
4. Plan future enhancements

---

**Deployment Complete!** 🚀

Your habit tracker app with reminder functionality is now live at:
https://habbit-app.vercel.app/

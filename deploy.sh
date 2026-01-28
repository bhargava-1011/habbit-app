#!/bin/bash

# 🚀 AUTOMATED DEPLOYMENT SCRIPT
# Run this script to deploy the reminder feature to production

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║     🚀 DEPLOYING REMINDER FEATURE TO PRODUCTION 🚀              ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're on the feature branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"
echo ""

if [ "$CURRENT_BRANCH" != "copilot/run-my-code-task" ]; then
    echo "⚠️  Warning: Not on feature branch. Switching..."
    git checkout copilot/run-my-code-task
fi

echo "📦 Step 1: Fetching latest changes..."
git fetch origin
echo "✅ Fetch complete"
echo ""

echo "🔀 Step 2: Switching to main branch..."
git checkout main 2>/dev/null || git checkout -b main
echo "✅ On main branch"
echo ""

echo "🔄 Step 3: Merging reminder feature..."
git merge copilot/run-my-code-task --no-edit
if [ $? -eq 0 ]; then
    echo "✅ Merge successful"
else
    echo "❌ Merge failed. Please resolve conflicts manually."
    exit 1
fi
echo ""

echo "⬆️  Step 4: Pushing to GitHub..."
git push origin main
if [ $? -eq 0 ]; then
    echo "✅ Push successful"
else
    echo "❌ Push failed. Check your authentication."
    echo "💡 You may need to push manually:"
    echo "   git push origin main"
    exit 1
fi
echo ""

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ DEPLOYMENT COMPLETE! ✅                    ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Vercel will auto-deploy in 2-5 minutes"
echo "🔗 Production URL: https://habbit-app.vercel.app/"
echo ""
echo "📋 Post-Deployment Checklist:"
echo "  1. Wait for Vercel deployment to complete"
echo "  2. Set NEXT_PUBLIC_API_URL in Vercel environment variables"
echo "  3. Visit https://habbit-app.vercel.app/"
echo "  4. Test reminder features:"
echo "     ✓ Create habit"
echo "     ✓ Enable reminder toggle"
echo "     ✓ Select time"
echo "     ✓ See bell icon 🔔"
echo ""
echo "📚 Documentation:"
echo "  - HOW_TO_DEPLOY.md"
echo "  - REMINDER_FEATURE.md"
echo "  - QUICKSTART_REMINDER.md"
echo ""
echo "🎉 Your reminder feature is now live!"

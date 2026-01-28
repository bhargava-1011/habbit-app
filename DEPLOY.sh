#!/bin/bash

echo "🚀 Habit App Deployment Setup"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✓ Git initialized"
else
    echo "✓ Git already initialized"
fi

echo ""
echo "📋 Deployment Steps:"
echo "===================="
echo ""
echo "STEP 1: Deploy Backend"
echo "1. Go to https://render.com"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository"
echo "4. Set Root Directory to: api"
echo "5. Build Command: npm install"
echo "6. Start Command: npm start"
echo "7. Add Environment Variables:"
echo "   - MONGODB_URI: (your MongoDB connection string)"
echo "   - NODE_ENV: production"
echo "8. Click Deploy and note the backend URL"
echo ""

echo "STEP 2: Deploy Frontend"
echo "1. Go to https://vercel.com"
echo "2. Click 'Add New' → 'Project'"
echo "3. Import your GitHub repository"
echo "4. Update NEXT_PUBLIC_API_URL environment variable with your backend URL"
echo "5. Click Deploy"
echo ""

echo "📝 Configuration Files Created:"
echo "- api/Procfile (for Render)"
echo "- api/.env.example"
echo "- .vercelrc (for Vercel)"
echo "- .env.example (frontend)"
echo "- DEPLOYMENT.md (detailed guide)"
echo ""

echo "✅ Ready for deployment!"
echo ""
echo "Need help? Check DEPLOYMENT.md for detailed instructions"

# Deployment Configuration Files

## For Render Backend

### render.yaml (Optional - Advanced)
```yaml
services:
  - type: web
    name: habbit-app-backend
    env: node
    region: oregon
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: MONGODB_URI
        fromDatabase:
          name: habbit-db
          property: connectionString
      - key: NODE_ENV
        value: production
```

---

## For Vercel Frontend

### vercel.json
```json
{
  "buildCommand": "npx expo export --platform web",
  "outputDirectory": "dist",
  "framework": "expo",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

---

## GitHub Actions Auto-Deploy

### .github/workflows/deploy.yml
```yaml
name: Auto Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Trigger Render Deployment
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
        
      - name: Trigger Vercel Deployment
        run: curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}
```

---

## Docker Support (Optional)

### api/Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/habbit-app
      - NODE_ENV=production
    depends_on:
      - mongodb

  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## Next.js Alternative (Advanced)

If you want to convert to Next.js for better deployment:

### package.json (Next.js version)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "axios": "^1.13.0"
  }
}
```

---

## Custom Domain Setup

### Using Vercel + Custom Domain
1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records (Vercel will show which ones)
5. Wait 24-48 hours for propagation

---

## SSL/HTTPS

- **Vercel**: Automatic (free)
- **Render**: Automatic (free)
- **Custom Domain**: Automatic with Let's Encrypt

---

## Database Backups

### MongoDB Atlas Backup
1. Go to cluster
2. Click "Backup" tab
3. Enable automatic backups
4. Free tier: 7-day retention

### Manual Backup
```bash
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/habbit-app" --out ./backup
```

---

## Environment Variable Reference

### Render Backend
```
MONGODB_URI = your_connection_string
PORT = 3000
NODE_ENV = production
CORS_ORIGIN = https://your-frontend.vercel.app
```

### Vercel Frontend
```
NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
NEXT_PUBLIC_ENV = production
```

---

## API Rate Limiting (Optional)

### Add to backend index.js
```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## Monitoring & Analytics

### Sentry Error Tracking
```bash
npm install @sentry/node
```

### LogRocket Session Replay
```bash
npm install logrocket
```

---

These templates and configurations will help you deploy successfully! 🚀

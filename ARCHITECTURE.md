# Habit App Deployment Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet Users                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        ┌───────▼────────┐    ┌──────▼──────────┐
        │  Vercel CDN    │    │   Vercel Logs   │
        │  (Frontend)    │    │  (Monitoring)   │
        └────────┬───────┘    └─────────────────┘
                 │
         https://your-app.vercel.app
                 │
        ┌────────▼──────────────┐
        │  React Native Web     │
        │  (Expo Frontend)      │
        │                       │
        │ ┌──────────────────┐  │
        │ │ Home Page        │  │
        │ │ Create Habit     │  │
        │ │ Edit/Delete      │  │
        │ └──────────────────┘  │
        └────────┬──────────────┘
                 │
                 │ API Calls (Axios)
                 │
        ┌────────▼──────────────────┐
        │   Render Web Service      │
        │   (Backend Server)        │
        │                           │
        │ ┌─────────────────────┐   │
        │ │  Express.js API     │   │
        │ │                     │   │
        │ │ GET /habitslist     │   │
        │ │ POST /habits        │   │
        │ │ PUT /habits/:id     │   │
        │ │ DELETE /habits/:id  │   │
        │ │ PATCH /habits/:id   │   │
        │ └─────────────────────┘   │
        └────────┬──────────────────┘
                 │
         https://your-backend.onrender.com
                 │
                 │ MongoDB Driver
                 │
        ┌────────▼──────────────────┐
        │  MongoDB Atlas (Cloud)    │
        │                           │
        │ ┌─────────────────────┐   │
        │ │ habbit-app Database │   │
        │ │                     │   │
        │ │ habits Collection   │   │
        │ │ - _id               │   │
        │ │ - name              │   │
        │ │ - color             │   │
        │ │ - repeatMode        │   │
        │ │ - completed         │   │
        │ └─────────────────────┘   │
        └────────────────────────────┘
```

---

## Deployment Workflow

```
┌─────────────────┐
│  Your Computer  │
│  (Dev Machine)  │
└────────┬────────┘
         │
         │ git push
         │
    ┌────▼─────────┐
    │   GitHub     │
    │  Repository  │
    └┬────────────┬┘
     │            │
     │ hook       │ hook
     │            │
   ┌─▼──────────┐ │   ┌──────────────┐
   │   Render   │ │   │    Vercel    │
   │  (Backend) │ │   │  (Frontend)  │
   │            │ │   │              │
   │ git pull   │ │   │ git pull     │
   │ npm install│ │   │ npm install  │
   │ npm start  │ │   │ npm build    │
   │            │ │   │ npm export   │
   └───┬────────┘ │   └──────┬───────┘
       │          │          │
       │ Build ✓  │ Build ✓  │
       │          │          │
   ┌───▼────────┐ │   ┌──────▼───────┐
   │ Running    │ │   │ Live on CDN  │
   │ Server     │ │   │ Cached       │
   └────────────┘ │   └──────────────┘
                  │
                  └─ Auto deploy on push
                     (Continuous Deployment)
```

---

## API Communication Flow

```
                Frontend (Vercel)
                       │
                       │ 1. fetch()
                       │ GET /habitslist
                       │
                       ▼
    ┌──────────────────────────────────┐
    │      Render Backend API          │
    ├──────────────────────────────────┤
    │ app.get("/habitslist", ...)      │
    │  ├─ Query MongoDB                │
    │  ├─ Get habits array             │
    │  └─ Return JSON                  │
    └────────────────┬─────────────────┘
                     │
                     │ 2. return JSON
                     │
    ┌────────────────▼─────────────────┐
    │     Frontend (Vercel)            │
    ├──────────────────────────────────┤
    │ response.data = [habits...]      │
    │ setHabits(response.data)         │
    │ Render UI                        │
    └──────────────────────────────────┘
```

---

## File Upload & Deployment Paths

```
Your Computer
    │
    ├── git push
    │   └─► GitHub (stores code)
    │
    ├── Render Pull (Backend)
    │   ├── Clone repo
    │   ├── cd api
    │   ├── npm install
    │   ├── npm start
    │   └── Server runs on port 3000
    │
    └── Vercel Pull (Frontend)
        ├── Clone repo
        ├── npm install
        ├── npx expo export --platform web
        ├── Build dist/
        └── Deploy to CDN
```

---

## Database Schema (MongoDB)

```
{
  "_id": ObjectId("..."),
  "name": "Morning Run",
  "color": "#3498DB",
  "repeatMode": "Daily",           ← "Daily", "Weekly", "Monthly"
  "reminder": true,
  "daysOfWeek": ["Monday", "Friday"],
  "daysOfMonth": [],
  "completed": {
    "2024-01-10": true,
    "2024-01-11": false
  },
  "archived": false,
  "createdAt": ISODate("2024-01-01T10:00:00Z")
}
```

---

## Environment Variables

### Production Environment

```
┌──────────────────────────────────┐
│      Render (Backend)            │
├──────────────────────────────────┤
│ MONGODB_URI = <connection_string>│
│ PORT = 3000                      │
│ NODE_ENV = production            │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│      Vercel (Frontend)           │
├──────────────────────────────────┤
│ NEXT_PUBLIC_API_URL =            │
│ https://backend.onrender.com     │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   MongoDB Atlas (Database)       │
├──────────────────────────────────┤
│ Connection: habbit-app cluster   │
│ Database: habbit-app             │
│ User: mansingh805                │
│ Network: 0.0.0.0/0 (all IPs)    │
└──────────────────────────────────┘
```

---

## Request/Response Cycle

```
1. User opens frontend URL
   └─► Vercel loads HTML + JS

2. App mounts, useEffect runs
   └─► fetchhabits() called

3. Frontend makes API call
   └─► POST https://backend.onrender.com/habitslist

4. Backend receives request
   └─► app.get("/habitslist", ...)

5. Backend queries MongoDB
   └─► Habit.find({})

6. MongoDB returns habits
   └─► [ { id: 1, name: "...", ... }, ... ]

7. Backend sends response
   └─► res.json(habits)

8. Frontend receives response
   └─► response.data = [ habits ]

9. Frontend updates state
   └─► setHabits(response.data)

10. UI renders updated list
    └─► User sees habits! ✅
```

---

## Performance Flow

```
Request Speed: User → CDN → Backend → Database → Backend → Frontend

┌────────────────────────────────────────┐
│ Vercel CDN (Cached)              ~10ms │  ← Fastest
├────────────────────────────────────────┤
│ Vercel Server                    ~50ms │
├────────────────────────────────────────┤
│ Network Latency                  ~100ms│
├────────────────────────────────────────┤
│ Render Backend Processing        ~100ms│
├────────────────────────────────────────┤
│ MongoDB Query                    ~50ms │
├────────────────────────────────────────┤
│ Response Back to Frontend        ~100ms│  ← Slowest
└────────────────────────────────────────┘
        Total: ~350-400ms typical
```

---

## Scaling Architecture

```
Current Setup (Small)
└─ 1 Render instance (free)
└─ 1 Vercel project
└─ MongoDB Atlas free tier

Medium Scale
└─ Multiple Render instances (Load Balanced)
└─ Vercel with custom domains
└─ MongoDB paid tier (replication)

Enterprise Scale
└─ Kubernetes with multiple regions
└─ Global CDN (Cloudflare)
└─ Database sharding
└─ Message queues (Redis)
└─ Monitoring (DataDog)
```

---

## Security Flow

```
HTTPS/SSL
  └─► All data encrypted in transit

Frontend (Vercel)
  ├─► CORS headers checked
  └─► XSS protection

Backend (Render)
  ├─► Input validation
  ├─► Rate limiting
  ├─► Error handling
  └─► Secure MongoDB connection

Database (MongoDB)
  ├─► IP whitelist (0.0.0.0/0)
  ├─► User authentication
  ├─► Encryption at rest
  └─► Automated backups
```

---

This architecture ensures your app is:
- ✅ Scalable
- ✅ Reliable
- ✅ Secure
- ✅ Cost-effective
- ✅ Maintainable

Happy deploying! 🚀

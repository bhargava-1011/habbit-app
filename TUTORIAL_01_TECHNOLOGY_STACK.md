# 📚 Tutorial 01: Technology Stack

## What is a Technology Stack?

A **technology stack** is the set of technologies used to build an application. Think of it like building a house - you need different materials and tools for different parts.

Our habit tracker app uses:
- **React Native** - For the mobile/web interface
- **Node.js + Express** - For the backend server
- **MongoDB** - For the database

---

## 🎨 Frontend: React Native

### What is React Native?

React Native lets you build mobile apps using JavaScript. One codebase works on:
- 📱 iOS (iPhone/iPad)
- 🤖 Android phones
- 🌐 Web browsers

### Why React Native?

**Advantages:**
- ✅ Write once, run everywhere
- ✅ Fast development
- ✅ Large community
- ✅ Reusable components
- ✅ Hot reload (see changes instantly)

**Example:**
```javascript
// This JavaScript code creates a button that works on iOS, Android, and Web!
<Button title="Click Me" onPress={() => alert('Hello!')} />
```

### What is Expo?

**Expo** makes React Native even easier:
- 📦 Pre-built components (camera, notifications, etc.)
- 🔧 No need for Xcode or Android Studio
- 📱 Test on your phone with Expo Go app
- 🚀 Easy deployment

---

## 🔧 Backend: Node.js + Express

### What is Node.js?

**Node.js** lets you run JavaScript on a server (not just in browsers).

**Before Node.js:**
- JavaScript only ran in web browsers
- Servers used PHP, Python, Java, etc.

**After Node.js:**
- JavaScript can run anywhere!
- One language for frontend AND backend

### What is Express?

**Express** is a framework that makes building servers easy.

**Without Express:**
```javascript
// Lots of complex code just to handle a simple request
```

**With Express:**
```javascript
// Simple and clean!
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});
```

### Why Node.js + Express?

**Advantages:**
- ✅ JavaScript everywhere (same language for frontend and backend)
- ✅ Fast and efficient
- ✅ Huge package ecosystem (npm)
- ✅ Easy to learn
- ✅ Great for real-time apps

---

## 💾 Database: MongoDB

### What is MongoDB?

**MongoDB** is a database that stores data as JSON-like documents.

**Traditional Database (SQL):**
```sql
-- Rigid structure, tables with fixed columns
CREATE TABLE habits (
  id INT,
  name VARCHAR(50),
  color VARCHAR(20)
);
```

**MongoDB (NoSQL):**
```javascript
// Flexible structure, store data as objects
{
  name: "Morning Exercise",
  color: "blue",
  reminder: true,
  reminderTime: "07:00"
}
```

### Why MongoDB?

**Advantages:**
- ✅ Flexible schema (easy to change structure)
- ✅ Works naturally with JavaScript
- ✅ Fast for read-heavy operations
- ✅ Scales easily
- ✅ Free tier available (MongoDB Atlas)

---

## 🔄 How They Work Together

### The Big Picture

```
┌─────────────────────────────────────────────┐
│           USER'S PHONE / BROWSER             │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │    React Native App (Frontend)     │     │
│  │  • Shows interface                 │     │
│  │  • Handles user clicks             │     │
│  │  • Displays data                   │     │
│  └─────────────────┬──────────────────┘     │
└────────────────────┼───────────────────────┘
                     │
                     │ Internet
                     │ (HTTP Requests)
                     │
┌────────────────────▼───────────────────────┐
│         SERVER (Render.com)                 │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │   Node.js + Express (Backend)      │    │
│  │  • Receives requests               │    │
│  │  • Processes data                  │    │
│  │  • Sends responses                 │    │
│  └─────────────────┬──────────────────┘    │
└────────────────────┼────────────────────────┘
                     │
                     │ Database Connection
                     │
┌────────────────────▼────────────────────────┐
│      DATABASE (MongoDB Atlas)                │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │         MongoDB                    │     │
│  │  • Stores habits                   │     │
│  │  • Stores reminder times           │     │
│  │  • Persists data                   │     │
│  └────────────────────────────────────┘     │
└──────────────────────────────────────────────┘
```

### Example: Creating a Habit

**Step 1:** User clicks "Create Habit" on phone
```javascript
// Frontend (React Native)
const createHabit = async () => {
  const response = await fetch('https://api.com/habits', {
    method: 'POST',
    body: JSON.stringify({ name: 'Morning Exercise' })
  });
};
```

**Step 2:** Request goes to backend server
```javascript
// Backend (Express)
app.post('/habits', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save(); // Save to MongoDB
  res.json(habit);
});
```

**Step 3:** Data is saved in MongoDB
```javascript
// Database (MongoDB)
{
  _id: "123abc",
  name: "Morning Exercise",
  createdAt: "2024-01-28"
}
```

**Step 4:** Backend sends success response

**Step 5:** Frontend shows the new habit

---

## 🔐 Additional Technologies

### Mongoose

**What:** MongoDB object modeling for Node.js

**Why:** Makes working with MongoDB easier

**Example:**
```javascript
// Define what a habit should look like
const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: String,
  reminder: Boolean,
  reminderTime: String
});
```

### Axios

**What:** HTTP client for making API requests

**Why:** Easier than fetch, works everywhere

**Example:**
```javascript
// Make a request to backend
const response = await axios.get('https://api.com/habits');
const habits = response.data;
```

### Expo Notifications

**What:** Library for push notifications

**Why:** Handle reminders and alerts

**Example:**
```javascript
// Schedule a notification
await Notifications.scheduleNotificationAsync({
  content: { title: 'Time for your habit!' },
  trigger: { hour: 9, minute: 0, repeats: true }
});
```

---

## 🎓 Learning Resources

### JavaScript (Must Learn First!)
- 📚 **JavaScript.info** - https://javascript.info/
- 🎥 **FreeCodeCamp** - https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
- 📖 **MDN** - https://developer.mozilla.org/en-US/docs/Web/JavaScript

### React Native
- 📚 **Official Docs** - https://reactnative.dev/docs/getting-started
- 🎥 **Traversy Media** - YouTube tutorials
- 📖 **Expo Docs** - https://docs.expo.dev/

### Node.js & Express
- 📚 **Node.js Docs** - https://nodejs.org/en/docs/
- 📖 **Express Guide** - https://expressjs.com/en/guide/routing.html
- 🎥 **Net Ninja** - YouTube Node.js tutorials

### MongoDB
- 📚 **MongoDB University** - https://university.mongodb.com/ (FREE!)
- 📖 **Mongoose Docs** - https://mongoosejs.com/docs/
- 🎥 **Web Dev Simplified** - YouTube MongoDB tutorials

---

## 🧪 Try It Yourself

### Experiment 1: JavaScript in Node.js

Create a file `test.js`:
```javascript
console.log('Hello from Node.js!');
console.log('2 + 2 =', 2 + 2);
```

Run it:
```bash
node test.js
```

### Experiment 2: Simple Express Server

Create `server.js`:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

Run it:
```bash
npm install express
node server.js
```

Visit: http://localhost:3000

### Experiment 3: MongoDB Connection

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('Cat saved!'));
```

---

## 📊 Technology Comparison

### Frontend Alternatives
| Technology | Pros | Cons |
|------------|------|------|
| React Native | Cross-platform, large community | Can be slower than native |
| Flutter | Fast, beautiful UI | Different language (Dart) |
| Native (Swift/Kotlin) | Best performance | Separate codebase per platform |

### Backend Alternatives
| Technology | Pros | Cons |
|------------|------|------|
| Node.js | JavaScript everywhere | Single-threaded |
| Python (Django) | Great for ML, clean syntax | Slower than Node |
| Java (Spring) | Enterprise-ready, fast | Verbose, complex |

### Database Alternatives
| Technology | Pros | Cons |
|------------|------|------|
| MongoDB | Flexible, JavaScript-friendly | Not ideal for complex relations |
| PostgreSQL | Powerful, reliable | Rigid schema |
| Firebase | Real-time, easy setup | Vendor lock-in |

---

## ✅ Check Your Understanding

Before moving to the next tutorial, make sure you can answer:

1. ❓ What is React Native used for?
2. ❓ Why use Node.js for the backend?
3. ❓ What kind of data does MongoDB store?
4. ❓ How do frontend and backend communicate?
5. ❓ What is the role of Express?

**Answers:**
1. Building cross-platform mobile and web apps with JavaScript
2. Allows using JavaScript on the server, same language as frontend
3. JSON-like documents (flexible objects)
4. Through HTTP requests (GET, POST, PUT, DELETE)
5. Simplifies creating web servers and APIs in Node.js

---

## 🎯 Next Steps

Now that you understand the technology stack:

1. ✅ You know what React Native, Node.js, and MongoDB are
2. ✅ You understand how they work together
3. ✅ You've seen simple examples

**Ready for the next step?**

→ Continue to [`TUTORIAL_02_PROJECT_STRUCTURE.md`](TUTORIAL_02_PROJECT_STRUCTURE.md)

Learn how this specific project is organized!

---

## 💬 Questions?

Common questions beginners ask:

**Q: Do I need to learn all three technologies?**
A: For full-stack development, yes. But you can start with frontend OR backend first.

**Q: Which should I learn first?**
A: JavaScript fundamentals, then choose frontend (React Native) or backend (Node.js).

**Q: How long does it take to learn?**
A: Basics: 2-3 months. Proficiency: 6-12 months. Mastery: Years of practice.

**Q: Can I use different technologies?**
A: Yes! This stack is just one option. The concepts transfer to other technologies.

---

**Next:** [`TUTORIAL_02_PROJECT_STRUCTURE.md`](TUTORIAL_02_PROJECT_STRUCTURE.md) →

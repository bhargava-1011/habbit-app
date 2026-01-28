# 📁 Tutorial 02: Project Structure

## Understanding File Organization

When you open this project, you might feel overwhelmed by all the files. Don't worry! This tutorial explains what everything is and why it's there.

---

## 🌳 Project Tree

```
habbit-app/
├── api/                    # Backend code (Express + MongoDB)
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   ├── Procfile           # Deployment config
│   └── .env.example       # Environment variables template
│
├── App.js                 # Main frontend entry point
├── index.js               # Home screen (habit list)
├── create.js              # Create habit screen
├── habbit.js              # Individual habit details
├── notificationUtils.js   # Notification functions
│
├── package.json           # Frontend dependencies
├── app.json               # Expo configuration
├── babel.config.js        # JavaScript compiler config
│
├── assets/                # Images and icons
├── node_modules/          # Installed packages (don't edit!)
│
├── .gitignore             # Files to not track in Git
├── .env.example           # Frontend environment variables
├── vercel.json            # Frontend deployment config
│
└── Documentation files/   # All the .md tutorial files
```

---

## 📂 Backend Directory (`api/`)

### `api/index.js` - The Heart of the Backend

This is where your server lives. It:
- Connects to MongoDB
- Defines API endpoints
- Handles requests from frontend

**Structure:**
```javascript
// 1. Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// 2. Create Express app
const app = express();

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// 4. Define database schema
const habitSchema = new mongoose.Schema({...});

// 5. Create API endpoints
app.get('/habitslist', async (req, res) => {...});
app.post('/habits', async (req, res) => {...});

// 6. Start server
app.listen(3000);
```

**What each part does:**

**Imports:** Bring in tools you need
```javascript
const express = require('express');  // Web server framework
const mongoose = require('mongoose'); // MongoDB library
const cors = require('cors');         // Allow cross-origin requests
```

**Middleware:** Functions that process requests
```javascript
app.use(cors());                      // Enable CORS
app.use(express.json());             // Parse JSON bodies
```

**Routes:** Define what happens at each URL
```javascript
// GET = Read data
app.get('/habitslist', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

// POST = Create data
app.post('/habits', async (req, res) => {
  const habit = new Habit(req.body);
  await habit.save();
  res.json(habit);
});

// PUT = Update data
app.put('/habits/:id', async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body);
  res.json(habit);
});

// DELETE = Remove data
app.delete('/habits/:id', async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
```

### `api/package.json` - Backend Dependencies

Lists what libraries the backend needs:

```json
{
  "dependencies": {
    "express": "Web server framework",
    "mongoose": "MongoDB ORM",
    "cors": "Cross-Origin Resource Sharing",
    "body-parser": "Parse request bodies"
  }
}
```

---

## 📱 Frontend Files

### `App.js` - Main Entry Point

The first file that runs when app starts:

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**What it does:**
- Sets up navigation (tabs/screens)
- Wraps entire app
- Defines overall structure

### `index.js` - Home Screen (Habit List)

Shows list of all habits:

```javascript
export default function Index() {
  const [habits, setHabits] = useState([]); // State to store habits
  
  // Load habits when screen opens
  useEffect(() => {
    fetchHabits();
  }, []);
  
  // Get habits from backend
  const fetchHabits = async () => {
    const response = await axios.get('API_URL/habitslist');
    setHabits(response.data);
  };
  
  // Render UI
  return (
    <View>
      {habits.map(habit => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </View>
  );
}
```

**Components:**
- `useState`: Store data
- `useEffect`: Run code when component loads
- `map`: Loop through habits to display each one

### `create.js` - Create Habit Screen

Form to add new habits:

```javascript
export default function CreateHabit() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  
  const handleSubmit = async () => {
    await axios.post('API_URL/habits', {
      name,
      color,
      reminder,
      reminderTime: formatTime(reminderTime)
    });
    navigation.goBack();
  };
  
  return (
    <View>
      <TextInput 
        value={name} 
        onChangeText={setName} 
        placeholder="Habit name"
      />
      <ColorPicker onSelect={setColor} />
      <Switch value={reminder} onValueChange={setReminder} />
      {reminder && (
        <DateTimePicker 
          value={reminderTime} 
          onChange={setReminderTime} 
        />
      )}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}
```

**Key concepts:**
- **State variables**: Store form values
- **Event handlers**: Respond to user actions
- **Conditional rendering**: Show time picker only if reminder is on

### `notificationUtils.js` - Notification Functions

Reusable functions for notifications:

```javascript
// Request permission to send notifications
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule a daily reminder
export async function scheduleHabitReminder(habit) {
  const [hours, minutes] = habit.reminderTime.split(':');
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🎯 Habit Reminder',
      body: `Time to complete: ${habit.name}`,
    },
    trigger: {
      hour: parseInt(hours),
      minute: parseInt(minutes),
      repeats: true,
    },
  });
}
```

**Why separate file?**
- Reusable across multiple screens
- Easier to test
- Keeps code organized

---

## ⚙️ Configuration Files

### `package.json` - Frontend Dependencies

```json
{
  "name": "habbit-app",
  "dependencies": {
    "expo": "App development platform",
    "react": "UI library",
    "react-native": "Mobile framework",
    "axios": "HTTP client",
    "expo-notifications": "Push notifications",
    "@react-native-community/datetimepicker": "Time picker"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

### `app.json` - Expo Configuration

```json
{
  "expo": {
    "name": "Habit Tracker",
    "slug": "habbit-app",
    "platforms": ["ios", "android", "web"],
    "notification": {
      "icon": "./assets/icon.png"
    }
  }
}
```

**Defines:**
- App name and icon
- What platforms to build for
- Notification settings
- Build configurations

### `babel.config.js` - JavaScript Compiler

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

**What it does:**
- Converts modern JavaScript to compatible version
- Handles JSX (HTML-like syntax in JavaScript)
- You rarely need to modify this

---

## 🔄 Data Flow

### Creating a Habit: Full Journey

```
1. USER ACTION
   User fills form in create.js
   ↓
   
2. FRONTEND STATE
   useState stores: name, color, reminder, time
   ↓
   
3. SUBMIT BUTTON
   handleSubmit() called
   ↓
   
4. HTTP REQUEST
   axios.post() sends data to backend
   ↓
   
5. BACKEND RECEIVES
   app.post('/habits') in api/index.js
   ↓
   
6. VALIDATE DATA
   Check if required fields exist
   ↓
   
7. SAVE TO DATABASE
   new Habit(data).save()
   ↓
   
8. MONGODB STORES
   Document saved in habits collection
   ↓
   
9. BACKEND RESPONDS
   res.json(habit) sends back saved habit
   ↓
   
10. FRONTEND RECEIVES
    Response received in create.js
    ↓
    
11. SCHEDULE NOTIFICATION
    If reminder enabled, schedule notification
    ↓
    
12. NAVIGATE BACK
    User returns to habit list
    ↓
    
13. LIST REFRESHES
    New habit appears in list
```

---

## 📦 Node Modules

### What is `node_modules/`?

**Never edit this folder!** It contains installed packages.

When you run:
```bash
npm install
```

It:
1. Reads `package.json`
2. Downloads all dependencies
3. Puts them in `node_modules/`

**Why so big?**
- Each package has its own dependencies
- Can be 100s of megabytes
- That's normal!

**Git Ignores It:**
- Listed in `.gitignore`
- Not uploaded to GitHub
- Everyone installs their own copy

---

## 🎨 Assets Directory

```
assets/
├── icon.png                    # App icon
├── splash-icon.png             # Loading screen
├── favicon.png                 # Website icon
├── android-icon-*.png          # Android icons
└── images/                     # Other images
```

**Icon Guidelines:**
- App icon: 1024x1024 px
- Must be square
- No transparency for iOS
- PNG format

---

## 📝 Documentation Files

All the `.md` files are tutorials and guides:

```
LEARNING_PATH.md            # This tutorial series (start here!)
TUTORIAL_01_*.md            # Technology explanation
TUTORIAL_02_*.md            # This file
...
DEPLOYMENT_*.md             # Deployment guides
TROUBLESHOOTING.md          # Common problems & solutions
```

**Markdown (.md) files:**
- Plain text with formatting
- Easy to read on GitHub
- Can include code examples

---

## 🔐 Environment Variables

### `.env.example` Files

Templates for sensitive data:

**Frontend `.env.example`:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Backend `api/.env.example`:**
```
MONGODB_URI=******cluster.mongodb.net/habbit-app
PORT=3000
NODE_ENV=production
```

**How to use:**
1. Copy `.env.example` to `.env`
2. Fill in your actual values
3. `.env` is in `.gitignore` (not uploaded to GitHub)

**Why?**
- Keep secrets safe
- Different values for dev/production
- Easy to configure

---

## 🚫 `.gitignore`

Tells Git what NOT to track:

```
node_modules/       # Too big, everyone installs their own
.env                # Contains secrets
*.log               # Temporary files
.DS_Store           # Mac system files
```

---

## 📊 File Size Comparison

Typical sizes in this project:

| File/Folder | Size | Why |
|-------------|------|-----|
| `node_modules/` | 200-500 MB | All dependencies |
| `api/index.js` | 5-10 KB | Main server code |
| `index.js` | 3-5 KB | Home screen |
| `package.json` | 1-2 KB | Just a list |
| Documentation | 100-200 KB | Text files |

---

## 🎯 Common Beginner Questions

**Q: Why so many files?**
A: Modern apps are complex. Each file has a specific purpose.

**Q: Do I need to understand every file?**
A: No! Start with the main ones (App.js, index.js, api/index.js).

**Q: Can I reorganize files?**
A: Yes, but it requires updating import paths everywhere.

**Q: What if I delete something by accident?**
A: That's what Git is for! You can always restore files.

**Q: Which files should I edit?**
A: Main code files (.js). Don't edit node_modules or config files unless you know why.

---

## ✅ Check Your Understanding

Before moving on, make sure you know:

1. ❓ Where is the backend code?
2. ❓ What file shows the habit list?
3. ❓ Where are API endpoints defined?
4. ❓ What's in node_modules?
5. ❓ Why do we have .env.example?

**Answers:**
1. `api/` directory, specifically `api/index.js`
2. `index.js` (main screen)
3. `api/index.js` (app.get, app.post, etc.)
4. Installed npm packages/dependencies
5. Template for environment variables without exposing secrets

---

## 🎓 Practice Exercise

### Exercise: File Scavenger Hunt

Find these in the project:

1. [ ] The file that defines the Habit database schema
2. [ ] The function that creates a new habit
3. [ ] Where notification permissions are requested
4. [ ] The app name and version
5. [ ] The list of frontend dependencies

**Answers:**
1. `api/index.js` (habitSchema)
2. `create.js` (handleSubmit function)
3. `notificationUtils.js` (requestNotificationPermissions)
4. `package.json` and `app.json`
5. `package.json` (dependencies section)

---

## 🎯 Next Steps

Now you understand:
- ✅ How files are organized
- ✅ What each major file does
- ✅ How data flows through the app
- ✅ Where to find things

**Ready to dive deeper?**

→ Continue to [`TUTORIAL_03_BACKEND.md`](TUTORIAL_03_BACKEND.md)

Learn how to build the backend from scratch!

---

**Previous:** [`TUTORIAL_01_TECHNOLOGY_STACK.md`](TUTORIAL_01_TECHNOLOGY_STACK.md)

**Next:** [`TUTORIAL_03_BACKEND.md`](TUTORIAL_03_BACKEND.md) →

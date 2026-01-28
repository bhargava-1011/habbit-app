const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection (modern syntax without deprecated options)
const mongoUrl = process.env.MONGODB_URI || "mongodb+srv://mansingh805:1234@cluster0.vyi8qyq.mongodb.net/habbit-app?retryWrites=true&w=majority";

console.log("Connecting to MongoDB (using DB):", mongoUrl.replace(/:[^:@]+@/, ':*****@'));

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("✓ Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.log("✗ Error connecting to MongoDB:", error.message);
    console.log("Continuing without DB connection. API will still run but DB operations may fail.");
  });

// Habit Schema
const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  repeatMode: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
    default: "Daily",
  },
  daysOfWeek: {
    type: [String],
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    default: [],
  },
  daysOfMonth: {
    type: [Number],
    default: [],
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Object,
    default: {},
  },
  archived: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

// API Routes

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Habit Tracker API is running", 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Get all habits (excluding archived)
app.get("/habitslist", async (req, res) => {
  try {
    const habits = await Habit.find({ archived: { $ne: true } });
    res.json(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ error: "Failed to fetch habits" });
  }
});

// Create a new habit
app.post("/habits", async (req, res) => {
  try {
    const { name, color, repeatMode, daysOfWeek, daysOfMonth, reminder } = req.body;
    
    const newHabit = new Habit({
      name,
      color,
      repeatMode,
      daysOfWeek,
      daysOfMonth,
      reminder,
    });

    await newHabit.save();
    console.log("Created new habit:", name);
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ error: "Failed to create habit" });
  }
});

// Get a single habit by ID
app.get("/habits/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.json(habit);
  } catch (error) {
    console.error("Error fetching habit:", error);
    res.status(500).json({ error: "Failed to fetch habit" });
  }
});

// Update habit (edit)
app.put("/habits/:id", async (req, res) => {
  try {
    const { name, color, repeatMode, daysOfWeek, daysOfMonth, reminder } = req.body;
    
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, color, repeatMode, daysOfWeek, daysOfMonth, reminder },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    console.log("Updated habit:", updatedHabit.name);
    res.json(updatedHabit);
  } catch (error) {
    console.error("Error updating habit:", error);
    res.status(500).json({ error: "Failed to update habit" });
  }
});

// Mark habit as completed for a specific day
app.put("/habits/:id/completed/:day", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    // Mark the day as completed
    if (!habit.completed) {
      habit.completed = {};
    }
    habit.completed[req.params.day] = true;
    habit.markModified("completed");

    await habit.save();
    console.log(`Marked habit "${habit.name}" as completed for ${req.params.day}`);
    res.json(habit);
  } catch (error) {
    console.error("Error marking habit as completed:", error);
    res.status(500).json({ error: "Failed to mark habit as completed" });
  }
});

// Archive a habit (PATCH)
app.patch("/habits/:id", async (req, res) => {
  try {
    const { archived } = req.body;
    
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { archived },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    console.log(`${archived ? 'Archived' : 'Unarchived'} habit:`, updatedHabit.name);
    res.json(updatedHabit);
  } catch (error) {
    console.error("Error archiving habit:", error);
    res.status(500).json({ error: "Failed to archive habit" });
  }
});

// Delete a habit
app.delete("/habits/:id", async (req, res) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    
    if (!deletedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    console.log("Deleted habit:", deletedHabit.name);
    res.json({ message: "Habit deleted successfully", habit: deletedHabit });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ error: "Failed to delete habit" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

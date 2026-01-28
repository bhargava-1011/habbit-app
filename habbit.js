const { Schema, model } = require("mongoose");

const habitSchema = new Schema({
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

const Habit = model("Habit", habitSchema);
module.exports = Habit;

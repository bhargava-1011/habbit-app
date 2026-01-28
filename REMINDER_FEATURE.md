# Reminder and Alarm Feature

## Overview
This feature adds reminder functionality with customizable alarm times to the Habit Tracker app.

## Features

### 1. Time Picker
- Users can set a specific time for their habit reminder
- Time is displayed in 24-hour format (HH:MM)
- Default reminder time is 09:00 (9:00 AM)

### 2. Notification System
- Uses expo-notifications for cross-platform notifications
- Supports iOS, Android, and Web platforms
- Scheduled daily reminders at the specified time
- Notifications include:
  - Title: "🎯 Habit Reminder"
  - Body: "Time to complete: [Habit Name]"
  - Sound and vibration (on supported platforms)

### 3. Permission Handling
- Automatically requests notification permissions on app launch
- Gracefully handles permission denial
- Platform-specific configurations:
  - **Android**: Creates notification channel "Habit Reminders"
  - **iOS**: Configures background modes for remote notifications
  - **Web**: Simulates notification scheduling (logs only)

## User Interface

### Create/Edit Habit Screen
1. **Reminder Toggle**: Switch to enable/disable reminders
2. **Time Picker**: Appears when reminder is enabled
   - Shows current reminder time with clock icon
   - Tap to open native time picker
   - Visual feedback with blue accent color

### Habit List Screen
- Habits with reminders show a bell icon (🔔) and time
- Format: "Daily • 🔔 09:00"

## Technical Implementation

### Backend Changes
**File**: `api/index.js`
- Added `reminderTime` field to Habit schema
- Updated POST `/habits` endpoint to accept reminderTime
- Updated PUT `/habits/:id` endpoint to update reminderTime

### Frontend Changes

**Files Modified**:
1. `create.js`
   - Added DateTimePicker component
   - State management for reminderTime and showTimePicker
   - UI for time selection with visual styling

2. `index.js`
   - Displays reminder time on habit cards
   - Schedules notifications when habits load
   - Requests notification permissions on mount

3. `notificationUtils.js` (New)
   - Notification permission handling
   - Scheduling and canceling notifications
   - Platform-specific notification configuration

4. `app.json`
   - Added expo-notifications plugin
   - Configured Android permissions (SCHEDULE_EXACT_ALARM, VIBRATE)
   - iOS background modes for notifications

### Dependencies Added
- `expo-notifications`: For notification scheduling and handling
- `@react-native-community/datetimepicker`: For time selection UI

## Usage

### For Users
1. Create a new habit or edit an existing one
2. Enable the "Reminder" toggle
3. Tap the time display to set your preferred reminder time
4. Save the habit
5. You'll receive a notification at the specified time each day

### For Developers

#### Scheduling a Notification
```javascript
import { scheduleHabitReminder } from './notificationUtils';

const habit = {
  _id: 'habit123',
  name: 'Morning Exercise',
  reminder: true,
  reminderTime: '07:30'
};

const notificationId = await scheduleHabitReminder(habit);
```

#### Canceling a Notification
```javascript
import { cancelHabitReminder } from './notificationUtils';

await cancelHabitReminder(notificationId);
```

## Platform-Specific Notes

### Web
- Notifications are simulated with console logs
- No actual push notifications are sent
- Time picker works normally

### Android
- Requires `SCHEDULE_EXACT_ALARM` permission for precise timing
- Uses notification channel "Habit Reminders"
- Supports vibration and sound

### iOS
- Requires notification permissions from user
- Background modes configured for remote notifications
- Native time picker with spinner interface

## Future Enhancements
- [ ] Multiple reminders per habit
- [ ] Custom notification sounds
- [ ] Snooze functionality
- [ ] Weekly/Monthly reminder schedules
- [ ] Notification action buttons (Complete, Skip)
- [ ] Reminder statistics and history

## Deployment Notes
- Ensure `NEXT_PUBLIC_API_URL` is set in Vercel environment
- No additional backend configuration needed
- Notification permissions will be requested on first app launch

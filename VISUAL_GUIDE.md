# Reminder Feature - Visual Guide

## 1. Create Habit Screen - Reminder Settings

When creating a habit, users can:
- Toggle the "Reminder" switch to enable/disable reminders
- When enabled, a time picker appears below
- Click the time display (with clock icon) to select reminder time
- Time is displayed in 24-hour format (HH:MM)

```
┌─────────────────────────────────────┐
│  Create New Habit                   │
├─────────────────────────────────────┤
│                                     │
│  Habit Name: [Morning Exercise]    │
│                                     │
│  Color: [●●●●●●]                   │
│                                     │
│  Repeat: [Daily]                   │
│                                     │
│  Reminder          [●────]          │
│                    ↑ Toggle         │
│  ┌───────────────────────────────┐  │
│  │ Reminder Time                 │  │
│  │ ┌─────────────────────────┐   │  │
│  │ │  🕒  09:00              │   │  │
│  │ └─────────────────────────┘   │  │
│  └───────────────────────────────┘  │
│                                     │
│  [SAVE]                            │
└─────────────────────────────────────┘
```

## 2. Habit List - Showing Reminders

Habits with reminders display a bell icon and time:

```
┌─────────────────────────────────────┐
│  📅 Today  📆 Weekly  📊 Monthly    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │ Morning Exercise           ➤│   │
│  │ Daily • 🔔 07:30            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Read Book                  ➤│   │
│  │ Daily • 🔔 20:00            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Meditation                 ➤│   │
│  │ Daily •                     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## 3. Habit Modal - Reminder Settings

When tapping a habit, the modal shows a reminder button:

```
┌─────────────────────────────────────┐
│               Morning Exercise    ✕ │
├─────────────────────────────────────┤
│                                     │
│  [✓ Complete]                      │
│                                     │
│  [⏭ Skip]                           │
│                                     │
│  [🔔 Reminder: 07:30            ▼] │ ← Expandable
│   ┌──────────────────────────────┐ │
│   │ Enable Reminder    [●────]   │ │
│   │                               │ │
│   │ Reminder time: 07:30         │ │
│   │ To change time, edit habit   │ │
│   └──────────────────────────────┘ │
│                                     │
│  [✏️ Edit]                          │
│                                     │
│  [🗑️ Delete]                        │
│                                     │
│  [📦 Archive]                       │
└─────────────────────────────────────┘
```

## 4. Notification Example

When the reminder time is reached:

```
╔═══════════════════════════════════╗
║  🎯 Habit Reminder               ║
╠═══════════════════════════════════╣
║  Time to complete:                ║
║  Morning Exercise                 ║
║                                   ║
║                          [View]   ║
╚═══════════════════════════════════╝
```

## Color Scheme

- **Primary Blue**: #2D8CFF (Time picker, active states)
- **Success Green**: #27AE60 (Complete, enabled toggle)
- **Warning Orange**: #F39C12 (Skip button)
- **Info Blue**: #3498DB (Edit button)
- **Danger Red**: #E74C3C (Delete button)
- **Gray**: #95A5A6 (Archive, disabled states)

## Icons Used

- 🔔 Bell - Reminder indicator
- 🕒 Clock - Time picker
- ✓ Check - Complete action
- ⏭ Skip - Skip action
- ✏️ Edit - Edit action
- 🗑️ Delete - Delete action
- 📦 Archive - Archive action
- ▼/▲ Expand - Toggle settings

## User Flow

1. User creates or edits a habit
2. Enables reminder toggle
3. Selects desired time (default 09:00)
4. Saves habit
5. App requests notification permissions (if not granted)
6. Notification is scheduled for the selected time
7. Daily notification appears at the set time
8. User can tap notification to view habit details
9. User can toggle reminder on/off from habit modal

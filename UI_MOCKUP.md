# Visual Mockup - Reminder Feature UI

## Screenshot 1: Create Habit Screen with Time Picker

```
╔══════════════════════════════════════════════╗
║  ←  Create New Habit                         ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Enter habit name                            ║
║  ┌──────────────────────────────────────┐   ║
║  │ Morning Exercise                      │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║  Select Color                                ║
║  ┌──────────────────────────────────────┐   ║
║  │ 🔵 🟢 🟡 🔴 🟣 🟠 🟤               │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║  Repeat                                      ║
║  ┌─────────┬─────────┬─────────────┐       ║
║  │ Daily ✓ │ Weekly  │  Monthly    │       ║
║  └─────────┴─────────┴─────────────┘       ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ Reminder              ┌────●────┐    │   ║  ← ON
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ Reminder Time                        │   ║
║  │ ┌────────────────────────────────┐   │   ║
║  │ │ 🕐  09:00                      │   │   ║  ← Tap to change
║  │ └────────────────────────────────┘   │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │           SAVE                       │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## Screenshot 2: Time Picker Dialog (iOS Style)

```
╔══════════════════════════════════════════════╗
║                                              ║
║           Select Time                        ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │        Hour      :     Minute        │   ║
║  │                                      │   ║
║  │         08                           │   ║
║  │        ┌09┐              ┌29┐       │   ║
║  │        │10│     :        │30│       │   ║
║  │        └11┘              └31┘       │   ║
║  │         12                           │   ║
║  │                                      │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║         [Cancel]        [Confirm]            ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## Screenshot 3: Habit List with Reminders

```
╔══════════════════════════════════════════════╗
║  ☰  Habbits                            +     ║
╠══════════════════════════════════════════════╣
║                                              ║
║  📅 Today  📆 Weekly  📊 Monthly  ⭐ Overall║
║                                              ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ║
║  ┃ Morning Exercise                  ➤┃   ║
║  ┃ Daily • 🔔 07:30                   ┃   ║  ← Shows time
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ║
║                                              ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ║
║  ┃ Read Book                         ➤┃   ║
║  ┃ Daily • 🔔 20:00                   ┃   ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ║
║                                              ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ║
║  ┃ Meditation                        ➤┃   ║
║  ┃ Daily •                            ┃   ║  ← No reminder
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ║
║                                              ║
║  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ║
║  ┃ Yoga Session                      ➤┃   ║
║  ┃ Weekly • 🔔 06:30                  ┃   ║
║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## Screenshot 4: Habit Modal with Reminder Settings

```
╔══════════════════════════════════════════════╗
║                                           ✕  ║
║         Morning Exercise                     ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ ✓  Complete                          │   ║  ← Complete action
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ ⏭  Skip                              │   ║  ← Skip action
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ 🔔 Reminder: 07:30                ▼ │   ║  ← NEW: Reminder button
║  └──────────────────────────────────────┘   ║
║  ╔════════════════════════════════════╗     ║  ← Expanded panel
║  ║ Enable Reminder      ┌────●────┐  ║     ║
║  ║                                  ║     ║
║  ║ Reminder time: 07:30             ║     ║
║  ║ To change time, edit the habit   ║     ║
║  ╚════════════════════════════════════╝     ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ ✏️  Edit                             │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ 🗑️  Delete                           │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
║  ┌──────────────────────────────────────┐   ║
║  │ 📦 Archive                           │   ║
║  └──────────────────────────────────────┘   ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## Screenshot 5: System Notification

```
┌────────────────────────────────────┐
│ ⏰ 07:30                            │
├────────────────────────────────────┤
│                                    │
│  🎯 Habit Reminder                 │
│                                    │
│  Time to complete:                 │
│  Morning Exercise                  │
│                                    │
│                      [View]  [✕]   │
│                                    │
└────────────────────────────────────┘
```

## Color Scheme Reference

### Primary Colors
- **Ocean Blue** (#2D8CFF): Primary actions, time picker
- **Emerald Green** (#27AE60): Complete, enabled toggle
- **Sunset Orange** (#F39C12): Skip action
- **Sky Blue** (#3498DB): Edit action
- **Coral Red** (#E74C3C): Delete action
- **Slate Gray** (#95A5A6): Archive, disabled states

### Background Colors
- **Cloud White** (#F7FBFF): Page background
- **Pure White** (#FFFFFF): Cards, surfaces
- **Mist Gray** (#F1F5F9): Subtle backgrounds

### Text Colors
- **Midnight** (#0F172A): Primary text
- **Charcoal** (#475569): Secondary text
- **Silver** (#94A3B8): Muted text

## Interactive Elements

### Toggle Switch (Reminder)
```
OFF:  ┌────○────┐  (Gray background)
ON:   ┌────●────┐  (Green background)
```

### Time Picker Button
```
┌───────────────────────────┐
│ 🕐  09:00                 │  ← Tap to open picker
└───────────────────────────┘
Border: Blue (#2D8CFF)
Background: White
```

### Expandable Panel
```
[🔔 Reminder: 07:30      ▼]  ← Collapsed
[🔔 Reminder: 07:30      ▲]  ← Expanded
```

## Animation Notes

1. **Time Picker**: Slides up from bottom on mobile
2. **Modal**: Slides up with fade overlay
3. **Toggle**: Smooth slide animation (300ms)
4. **Expand Panel**: Height animation with ease-in-out
5. **Button Press**: Scale down slightly (0.95) with haptic feedback

## Accessibility

- All buttons have proper touch targets (44x44 minimum)
- Text contrast meets WCAG AA standards
- Screen reader support for all interactive elements
- Time picker supports keyboard navigation on web

## Responsive Design

### Mobile (< 768px)
- Full width cards
- Bottom sheet modal
- Native time picker

### Tablet/Desktop (> 768px)
- Max width 600px, centered
- Centered modal dialog
- Web time input fallback

---

**Note**: These mockups represent the actual implementation in the code. The UI uses React Native components that render natively on iOS/Android and as web components in browsers.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request notification permissions
export async function requestNotificationPermissions() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permission not granted');
      return false;
    }

    // For Android, create a notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('habit-reminders', {
        name: 'Habit Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2D8CFF',
        sound: 'default',
      });
    }

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

// Schedule a daily notification for a habit
export async function scheduleHabitReminder(habit) {
  try {
    if (!habit.reminder || !habit.reminderTime) {
      return null;
    }

    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.log('No notification permission, cannot schedule');
      return null;
    }

    // Parse the reminder time (format: "HH:MM")
    const [hours, minutes] = habit.reminderTime.split(':').map(Number);

    const trigger = {
      hour: hours,
      minute: minutes,
      repeats: true,
    };

    // For web, we can't schedule actual notifications, but we can simulate
    if (Platform.OS === 'web') {
      console.log(`Would schedule notification for ${habit.name} at ${habit.reminderTime}`);
      return 'web-notification-id';
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎯 Habit Reminder',
        body: `Time to complete: ${habit.name}`,
        data: { habitId: habit._id, habitName: habit.name },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        categoryIdentifier: 'habit-reminder',
      },
      trigger,
    });

    console.log(`Scheduled notification for ${habit.name} at ${habit.reminderTime}`, notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

// Cancel a scheduled notification
export async function cancelHabitReminder(notificationId) {
  try {
    if (Platform.OS === 'web') {
      console.log('Would cancel notification:', notificationId);
      return;
    }

    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Cancelled notification:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
}

// Cancel all notifications for a habit (useful when deleting)
export async function cancelAllHabitReminders() {
  try {
    if (Platform.OS === 'web') {
      console.log('Would cancel all notifications');
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
}

// Get all scheduled notifications (for debugging)
export async function getAllScheduledNotifications() {
  try {
    if (Platform.OS === 'web') {
      console.log('Web platform - no scheduled notifications');
      return [];
    }

    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log('All scheduled notifications:', notifications);
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

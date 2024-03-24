import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function initNotifications() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
}

export async function scheduleReminderNotification() {
    const hourOfTheDay = 11;
    const delayDays = 2;
    const title = 'Time to Practice Hindi!';
    const body = 'Daily reading practice is the best way to improve your language skills. Open Linguin to read a new story!';

    const date = new Date(Date.now());
    date.setHours(hourOfTheDay);
    date.setDate(date.getDate() + delayDays);

    await Notifications.cancelAllScheduledNotificationsAsync();
    
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
        },
        trigger: { date },
    });
}
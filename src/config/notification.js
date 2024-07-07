import notifee, { EventType, TriggerType } from '@notifee/react-native';

import log from "./logger";

const showNotification = async (title, body, notificationId, channelName, channelId) => {
    try {
        // for ios
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channel = await notifee.createChannel({
            id: channelId || 'nrg',
            name: channelName || 'nrg',
        });

        // Display a notification
        await notifee.displayNotification({
            id: notificationId || "nrg",
            title: title,
            body: body,
            android: {
                channel,
                pressAction: {
                    id: 'default',
                },
            },
        });
    } catch (error) {
        log.error("error in displaying notification", error)
    }
}

const setNotification = async (title, body, timeoutInMinutes, notificationId, channelName, channelId) => {
    try {
        const date = new Date(Date.now());
        date.setSeconds(date.getSeconds() + timeoutInMinutes)

        // Create a time-based trigger
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
        };


        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                id: notificationId || "nrg",
                title: title,
                body: body,
                android: {
                    channelId: channelId || 'nrg',
                    name: channelName || 'nrg',
                    pressAction: {
                        id: 'default',
                    },
                },
            },
            trigger,
        );
    } catch (error) {
        log.error("error in setting notification", error)
    }

}

const cancelNotification = async (notificationId) => {
    try {
        await notifee.cancelNotification(notificationId);
    } catch (error) {
        log.error("error in cancelling notification", error)
    }
}

// Background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification } = detail;

    // Check the type of event
    if (type === EventType.DISMISSED) {
        log.info('Notification was dismissed', notification);
    }
});

const notifications = {
    showNotification,
    setNotification,
    cancelNotification
}

export default notifications;
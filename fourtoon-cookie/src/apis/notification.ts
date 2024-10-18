import {Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import {requestApi} from "./api";
import {API_METHOD_TYPE, API_STATUS} from "../types/api";
import type {NotificationTokenAssignRequest} from "../types/dto/notification";
import {ApiError} from "../types/error/ApiError";
import i18n from "../system/i18n";

export const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            throw new Error('Permission not granted to get push token for push notification!')
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error('Project ID not found');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e: unknown) {
            throw new Error(`${e}`)
        }
    } else {
        throw new Error('Must use physical device for push notifications');
    }
}

export const assignPushNotificationToken = async () => {
    const pushNotificationToken = await registerForPushNotificationsAsync();

    const requestBody: NotificationTokenAssignRequest = {
        notificationToken: pushNotificationToken,
    };

    const response = await requestApi(`/notification`, API_METHOD_TYPE.POST, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.notification.put"), response.status);
    }
}

export const unassignPushNotificationToken = async () => {
    const pushNotificationToken = await registerForPushNotificationsAsync();

    const requestBody: NotificationTokenAssignRequest = {
        notificationToken: pushNotificationToken,
    };

    const response = await requestApi(`/notification`, API_METHOD_TYPE.DELETE, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.notification.put"), response.status);
    }
}
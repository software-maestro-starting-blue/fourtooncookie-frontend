import {requestApi} from "./api";
import {API_METHOD_TYPE, API_STATUS} from "../types/api";
import type {NotificationTokenRequest} from "../types/dto/notification";
import {ApiError} from "../types/error/ApiError";
import i18n from "../system/i18n";

export const assignPushNotificationToken = async (pushNotificationToken: string) => {

    const requestBody: NotificationTokenRequest = {
        notificationToken: pushNotificationToken,
    };

    const response = await requestApi(`/notification`, API_METHOD_TYPE.POST, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.notification.put"), response.status);
    }
}

export const unassignPushNotificationToken = async (pushNotificationToken: string) => {
    
    const requestBody: NotificationTokenRequest = {
        notificationToken: pushNotificationToken,
    };

    const response = await requestApi(`/notification`, API_METHOD_TYPE.DELETE, requestBody);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.notification.put"), response.status);
    }
}
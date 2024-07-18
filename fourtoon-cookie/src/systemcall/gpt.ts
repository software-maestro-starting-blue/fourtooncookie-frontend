import * as Location from 'expo-location';
import type { Position } from "../types/gps";

export const getGpsPosition = async (): Promise<Position> => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        throw new Error("getGpsPosition error");
    }

    const location = await Location.getCurrentPositionAsync({});

    const gpsPos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    return gpsPos;
}
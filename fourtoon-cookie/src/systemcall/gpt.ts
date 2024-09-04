import * as Location from 'expo-location';
import type { Position } from "../types/gps";

export const getGpsPosition = async (): Promise<Position> => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        throw new Error("GPS 위치 권한이 거부되었습니다. 권한을 허용해 주세요.");
    }

    const location = await Location.getCurrentPositionAsync({});

    const gpsPos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    return gpsPos;
}
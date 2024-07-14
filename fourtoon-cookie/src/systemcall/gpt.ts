import * as Location from 'expo-location';
import { Position } from "../types/gps";

export const getGpsPosition = async (): Promise<Position | null> => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        console.log("위치 권한 설정 거부");
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    const gpsPos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    console.log(gpsPos);

    return gpsPos;
}
import * as Location from 'expo-location';
import { Position } from "../types/gps";

export const getGpsPosition = async (): Promise<Position> => {
    let gpsPos: Position = { latitude: -1, longitude: -1 };

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        console.log("위치 권한 설정 거부");
        return gpsPos;
    }

    const location = await Location.getCurrentPositionAsync({});

    gpsPos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }

    console.log(gpsPos);

    return gpsPos;
}
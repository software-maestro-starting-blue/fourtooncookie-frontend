import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { Position } from "../types/gps";

const iosGpsPermissionValidation = async () => {
    return true;
}

const androidGpsPermissionValidation = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: '위치 권한 설정',
            message: '일기에 날씨 정보를 입력하기 위해서는 위치 정보가 필요해요 😊',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission denied");
        // TODO: 팝업으로 권한 설정을 안내해주는 것이 좋을 듯
        return false;
    }
    return true;
}

export type getGpsPositionType = () => Promise<Position>;

export const getGpsPosition: getGpsPositionType = async () => {
    let gpsPos: Position = { latitude: -1, longitude: -1 };
    
    if (Platform.OS === 'android' && ! await androidGpsPermissionValidation()) // 안드로이드에서만 위치 정보 권한을 요청
        return gpsPos;

    if (Platform.OS === 'ios' && ! await iosGpsPermissionValidation()) // iOS에서만 위치 정보 권한을 요청
        return gpsPos;

    Geolocation.getCurrentPosition(
        (position) => {
            gpsPos = {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude 
            };
        },
        (error) => {
            // TODO: 팝업으로 위치 정보를 가져오는데 실패했다는 것을 알려주는 것이 좋을 듯
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );

    return gpsPos;
}
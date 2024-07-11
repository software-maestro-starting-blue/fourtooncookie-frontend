import { Position } from "../types/gps";

const API_URL = "";

export const getWeather = async (date: Date, gpsPos: Position): Promise<string> => {

    const query = {
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
        day: date.getDate().toString(),
        latitude: gpsPos.latitude.toString(),
        longitude: gpsPos.longitude.toString()
    }

    const queryString = new URLSearchParams(query).toString();
    
    const response = await fetch(`${API_URL}/diary?` + queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
        }
    });

    const data = await response.json();

    return data["weather-id"];
}
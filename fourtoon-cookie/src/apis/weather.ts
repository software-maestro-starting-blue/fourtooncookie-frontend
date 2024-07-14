import { API_URL } from "../constants/api";
import type { WeatherFromGpsResponse } from "../types/dto/weather";
import type { Position } from "../types/gps";

export const getWeather = async (date: Date, gpsPos: Position): Promise<number | null> => {

    const query = {
        year: date.getFullYear().toString(),
        month: date.getMonth().toString(),
        day: date.getDate().toString(),
        latitude: gpsPos.latitude.toString(),
        longitude: gpsPos.longitude.toString()
    }

    const queryString = new URLSearchParams(query).toString();
    
    try {
        const response = await fetch(`${API_URL}/weather?` + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
            }
        });

        if (response.status === 200) {
            const data: WeatherFromGpsResponse = await response.json();
            return data.weatherId;
        }
    } catch (error) {
        console.error("getWeather : ", error)
    }

    return null;
}
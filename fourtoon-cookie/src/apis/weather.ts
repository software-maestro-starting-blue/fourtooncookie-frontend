import { Position } from "../types/gps";

export type getWeatherType = (date: Date, gpsPos: Position) => Promise<string>;

export const getWeather: getWeatherType = async (date: Date, gpsPos: Position) => {
    
    return "";
}
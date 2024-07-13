import { API_URL } from "../constants/api";

export const getHashtags = async (content: string): Promise<number[]> => {
    const query = {
        content: content
    };

    const queryString = new URLSearchParams(query).toString();

    const response = await fetch(API_URL + "/lambda/hashtags?" + queryString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        return data["hashtags"];
    } else {
        return [];
    }
}
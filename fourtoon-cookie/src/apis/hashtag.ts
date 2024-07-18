import { API_URL } from "@env";
import type { HashtagFromContentResponse } from "../types/dto/hashtags";

export const getHashtag = async (content: string): Promise<number[] | null> => {
    const query = {
        content: content
    };

    const queryString = new URLSearchParams(query).toString();
    
    try {
        const response = await fetch(API_URL + "/hashtag?" + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            const data: HashtagFromContentResponse = await response.json();
            return data.hashtags;
        }
    } catch (error) {
        console.error("getHashtag : ", error);
    }

    return null;
}
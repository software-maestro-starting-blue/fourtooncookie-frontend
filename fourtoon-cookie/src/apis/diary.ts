import type { DiarySaveRequest } from "../types/dto";

const API_URL = "";

export const postDiary = async (date: Date, content: string, hashtagIds: number[]) => {

    const requestBody: DiarySaveRequest = {
        memberId: -1,
        characterId: -1,
        content: content,
        thumbnailUrl: "",
        hashtagIds: hashtagIds
    }; // TODO

    const response = await fetch(`${API_URL}/diary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
        },
        body: JSON.stringify(requestBody)
    });
    
    if (response.status === 200) { // TODO
        return response.json();
    } else {
        return null;
    }

}

export const putDiary = async (diaryId: number, content: string, hashtagIds: number[]) => {
    
    const requestBody = null; // TODO

    const response = await fetch(`${API_URL}/diary`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
        },
        body: JSON.stringify(requestBody)
    });
    
    if (response.status === 200) { // TODO
        return response.json();
    } else {
        return null;
    }

}
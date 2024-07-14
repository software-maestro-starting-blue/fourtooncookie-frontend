import { API_URL } from "../constants/api";
import type { DiarySaveRequest } from "../types/dto/diary";

export const postDiary = async (date: Date, content: string, hashtagIds: number[]): Promise<boolean> => {

    const requestBody: DiarySaveRequest = {
        characterId: -1,
        content: content,
        hashtagIds: hashtagIds,
        diaryDate: date,
    }; // TODO: 캐릭터 아이디를 가지고 와야함.

    try {
        const response = await fetch(`${API_URL}/diary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.status === 200) {
            return true;
        } 
    } catch (error) {
        console.error("postDiary : ", error);
    }

    return false;
}

export const patchDiary = async (diaryId: number, content: string, hashtagIds: number[]): Promise<boolean> => {
    
    const requestBody = null; // TODO: 캐릭터 아이디를 가지고 와야함.

    try {
        const response = await fetch(`${API_URL}/diary/${diaryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
            },
            body: JSON.stringify(requestBody)
        });
        
        if (response.status === 200) {
            return true;
        } 
    } catch (error) {
        console.error("patchDiary : ", error);
    }

    return false;

}
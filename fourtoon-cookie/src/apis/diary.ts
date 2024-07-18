import { API_URL } from "@env";
import type { Diary } from "../types/diary";
import type { DiarySaveRequest, DiarySavedResponse, DiaryUpdateRequest } from "../types/dto/diary";

export const getDiary = async (diaryId: number): Promise<Diary> => {

    try {
        const response = await fetch(`${API_URL}/diary/${diaryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ' Authorization': `Bearer ${localStorage.getItem('accessToken')}` // TODO: accessToken 관리에 대한 논의가 필요합니다..!
            }
        });
        
        if (response.status === 200) {
            const diaryResponse: DiarySavedResponse = await response.json();
            return { ...diaryResponse };
        }
    } catch (error) {
        console.error("getDiary : ", error);
    }

    throw new Error("getDiary error");
}

export const postDiary = async (date: Date, content: string, hashtagIds: number[]) => {

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
            return;
        }
    } catch (error) {
        console.error("postDiary : ", error);
    }

    throw new Error("postDiary error");
}

export const patchDiary = async (diaryId: number, content: string, hashtagIds: number[]) => {
    
    const requestBody: DiaryUpdateRequest = {
        content: content,
        hashtagIds: hashtagIds,
        characterId: -1
    }; // TODO: 캐릭터 아이디를 가지고 와야함.

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
            return;
        } 
    } catch (error) {
        console.error("patchDiary : ", error);
    }

    throw new Error("patchDiary error");
}
import { Diary } from "../types/diary";

const API_URL = "";

export const postDiary = async (diary: Diary) => {

    const response = await fetch(`${API_URL}/diary`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ' Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(diary)
    });
    
    if (response.status === 200) {
        return response.json();
    } else {
        return null;
    }

}

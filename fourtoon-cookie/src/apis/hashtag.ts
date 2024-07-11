const API_URL = "";

export const getHashtags = async (content: string): Promise<number[]> => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    });

    if (response.status === 200) {
        const data = await response.json();
        return data["hashtags"];
    } else {
        return [];
    }
}
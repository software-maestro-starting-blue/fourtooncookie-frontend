export interface Diary {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    date: Date,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}
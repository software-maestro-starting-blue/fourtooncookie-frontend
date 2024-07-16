export interface Diary {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: Date,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}
export interface DiarySaveRequest {
    content: string,
    hashtagIds: number[],
    diaryDate: Date,
    characterId: number
}

export interface DiaryUpdateRequest {
    content: string,
    hashtagIds: number[],
    characterId: number
}

export interface DiarySavedResponse {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    date: Date,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}
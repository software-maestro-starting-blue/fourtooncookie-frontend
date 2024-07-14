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
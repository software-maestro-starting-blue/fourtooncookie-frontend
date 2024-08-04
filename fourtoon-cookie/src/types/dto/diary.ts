import { LocalDate } from "@js-joda/core"

export interface DiarySaveRequest {
    content: string,
    hashtagIds: number[],
    diaryDate: LocalDate,
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
    diaryDate: LocalDate,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}
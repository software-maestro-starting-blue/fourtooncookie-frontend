import { LocalDate } from "@js-joda/core"
import { DiaryStatus } from "../diary"

export interface DiarySaveRequest {
    content: string,
    diaryDate: LocalDate,
    characterId: number
}

export interface DiaryUpdateRequest {
    content: string,
    characterId: number
}

export interface DiaryPatchFavoriteRequest {
    isFavorite: boolean
}

export interface DiarySavedResponse {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: string,
    paintingImageUrls: string[],
    characterId: number,
    diaryStatus: DiaryStatus
}

export interface DiaryCreatedResponse {
    diaryId: number
}
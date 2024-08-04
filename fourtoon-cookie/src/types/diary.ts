import { LocalDate } from "@js-joda/core";

export interface Diary {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: LocalDate,
    paintingImageUrls: string[],
    hashtagIds: number[],
    characterId: number
}
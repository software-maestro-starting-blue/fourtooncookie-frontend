import { LocalDate } from "@js-joda/core";

export interface Diary {
    diaryId: number,
    content: string,
    isFavorite: boolean,
    diaryDate: LocalDate,
    paintingImageUrls: string[],
    characterId: number,
    diaryStatus: DiaryStatus,
}

export enum DiaryStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

// TODO 타 페이지와의 유기성 유지 필요
export type Diary = {
    diaryId: number,
    content: string,
    hashtags: number[], // TODO: hashtag에 대한 type 정의가 필요해 보임
    weather: string // TODO: weather에 대한 type 정의가 필요해 보임
    // TODO...
}
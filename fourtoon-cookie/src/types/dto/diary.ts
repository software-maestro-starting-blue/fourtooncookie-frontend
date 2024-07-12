

export interface DiarySaveRequest {
    memberId: number,
    characterId: number,
    content: string,
    thumbnailUrl: string,
    hashtagIds: number[]
}
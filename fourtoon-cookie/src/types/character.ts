export interface Character {
    id: number,
    paymentType: CharacterPaymentType,
    artworkTitle: string,
    artworkThumbnailUrl: string,
    name: string,
    selectionThumbnailUrl: string 
}

export enum CharacterPaymentType {
    FREE = 'FREE',
    PAID = 'PAID',
    FREE_KOR = '무료',
    PAID_KOR = '유료'
};

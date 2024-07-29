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
};

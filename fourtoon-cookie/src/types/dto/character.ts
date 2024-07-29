import { CharacterPaymentType } from "../character";

export interface CharacterSavedResponse {
    id: number,
    paymentType: CharacterPaymentType,
    artworkTitle: string,
    artworkThumbnailUrl: string,
    name: string,
    selectionThumbnailUrl: string 
}
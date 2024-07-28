import { FREE, PAID } from "../constants/character";

export interface Character {
    id: number,
    characterVisionType: string,
    artworkTitle: string,
    artworkThumbnailUrl: string,
    name: string,
    selectionThumbnailUrl: string 
}

export type CharacterCategory = typeof FREE | typeof PAID;
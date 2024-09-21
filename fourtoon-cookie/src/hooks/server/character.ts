import { useQuery } from "react-query"
import { getCharacters } from "../../apis/character"


export const useCharacters = () => {
    return useQuery("characters", getCharacters);
}
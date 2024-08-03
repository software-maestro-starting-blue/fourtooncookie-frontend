import { API_URL } from "@env";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { MemberUpdateRequest } from "../types/dto/member";
import { Gender } from "../types/gender";
import { requestApi } from "./api";


export const patchMember = async (name: string, birth: Date, gender: Gender, jwtContext: GlobalJwtTokenStateContextProps) => {
    const requestBody: MemberUpdateRequest = {
        name: name,
        birth: birth,
        gender: gender
    };

    try {
        const response = await requestApi(`${API_URL}/member`, 'PATCH', jwtContext, requestBody);
        if (response.status != 200) {
            throw new Error("patchMember error");
        }
    } catch (e) {
        console.error("patchMember : ", e);
        throw new Error("patchMember error");
    }
}
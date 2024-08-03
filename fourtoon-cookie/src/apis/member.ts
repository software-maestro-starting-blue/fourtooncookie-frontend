import { API_URL } from "@env";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import { MemberSavedResponse, MemberUpdateRequest } from "../types/dto/member";
import { Gender } from "../types/gender";
import { requestApi } from "./api";
import { Member } from "../types/member";
import { LocalDate } from "@js-joda/core";

export const getMember = async (jwtContext: GlobalJwtTokenStateContextProps): Promise<Member> => {
    try {
        const response = await requestApi(`${API_URL}/member`, 'GET', jwtContext);
        if (response.status != 200) {
            throw new Error("getMember error");
        }

        const data: MemberSavedResponse = await response.json();
        return {...data};
    } catch (e) {
        console.error("getMember : ", e);
        throw new Error("getMember error");
    }

}

export const patchMember = async (name: string, birth: LocalDate, gender: Gender, jwtContext: GlobalJwtTokenStateContextProps) => {
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
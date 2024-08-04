import { API_URL } from "@env";
import { GlobalJwtTokenStateContextProps } from "../components/global/GlobalJwtToken/GlobalJwtTokenStateContext";
import type { MemberSavedResponse, MemberUpdateRequest } from "../types/dto/member";
import { Gender } from "../types/gender";
import { requestApi } from "./api";
import type { Member } from "../types/member";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";

export const getMember = async (jwtContext: GlobalJwtTokenStateContextProps): Promise<Member> => {
    const response = await requestApi(`/member`, 'GET', jwtContext);

    if (response.status != 200) {
        throw new ApiError("getMember error");
    }

    const data: MemberSavedResponse = await response.json();
    return {...data};

}

export const patchMember = async (name: string, birth: LocalDate, gender: Gender, jwtContext: GlobalJwtTokenStateContextProps) => {
    const requestBody: MemberUpdateRequest = {
        name: name,
        birth: birth,
        gender: gender
    };

    const response = await requestApi(`/member`, 'PATCH', jwtContext, requestBody);
    if (response.status != 200) {
        throw new ApiError("patchMember error");
    }
}
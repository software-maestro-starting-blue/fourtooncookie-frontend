import type { MemberSavedResponse, MemberUpdateRequest } from "../types/dto/member";
import { Gender } from "../types/gender";
import { requestApi } from "./api";
import type { Member } from "../types/member";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";

export const getMember = async (): Promise<Member> => {
    const response = await requestApi(`/member`, 'GET');

    if (response.status != 200) {
        throw new ApiError("회원 정보를 가져오는 중 오류가 발생했습니다."); 
    }

    const data: MemberSavedResponse = await response.json();
    return {...data};

}

export const patchMember = async (name: string, birth: LocalDate, gender: Gender) => {
    const requestBody: MemberUpdateRequest = {
        name: name,
        birth: birth,
        gender: gender
    };

    const response = await requestApi(`/member`, 'PATCH', requestBody);
    if (response.status != 200) {
        throw new ApiError("회원가입 중 오류가 발생했습니다.");
    }
}

export const deleteMember = async () => {
    const response = await requestApi(`/member`, 'DELETE');
    if (response.status != 204) {
        throw new ApiError("회원 정보를 삭제하는 중 오류가 발생했습니다.");
    }
}
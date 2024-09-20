import type { MemberSavedResponse, MemberSaveRequest } from "../types/dto/member";
import { Gender } from "../types/gender";
import { requestApi } from "./api";
import type { Member } from "../types/member";
import { LocalDate } from "@js-joda/core";
import { ApiError } from "../error/ApiError";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";
import { JWTToken } from "../types/jwt";

export const getMember = async (jwtToken?: JWTToken): Promise<Member> => {
    const response = await requestApi(`/member`, API_METHOD_TYPE.GET, undefined, jwtToken);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("회원 정보를 가져오는 중 오류가 발생했습니다.", response.status); 
    }

    const data: MemberSavedResponse = await response.json();
    return {...data};

}

export const postMember = async (name: string, birth: LocalDate, gender: Gender) => {
    const requestBody: MemberSaveRequest = {
        name: name,
        birth: birth,
        gender: gender
    };

    const response = await requestApi(`/member`, API_METHOD_TYPE.POST, requestBody);

    if (response.status != API_STATUS.CREATED) {
        throw new ApiError("회원가입 중 오류가 발생했습니다.", response.status);
    }
}

export const deleteMember = async () => {
    const response = await requestApi(`/member`, API_METHOD_TYPE.DELETE);

    if (response.status != API_STATUS.NO_CONTENT) {
        throw new ApiError("회원 정보를 삭제하는 중 오류가 발생했습니다.", response.status);
    }
}
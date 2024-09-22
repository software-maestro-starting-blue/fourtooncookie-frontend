import type { MemberSavedResponse, MemberSaveRequest } from "../types/dto/member";
import { requestApi } from "./api";
import type { Member } from "../types/member";
import { ApiError } from "../error/ApiError";
import { API_METHOD_TYPE, API_STATUS } from "../constants/api";

export const getMember = async (): Promise<Member> => {
    const response = await requestApi(`/member`, API_METHOD_TYPE.GET);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError("회원 정보를 가져오는 중 오류가 발생했습니다.", response.status); 
    }

    const data: MemberSavedResponse = await response.json();
    return {...data};

}

export const postMember = async (member: Member) => {
    const requestBody: MemberSaveRequest = member;

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
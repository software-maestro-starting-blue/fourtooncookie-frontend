import type { MemberSavedResponse, MemberSaveRequest } from "../types/dto/member";
import { requestApi } from "./api";
import type { Member } from "../types/member";
import { ApiError } from "../types/error/ApiError";
import { API_METHOD_TYPE, API_STATUS } from "../types/api";
import i18n from "../system/i18n";

export const getMember = async (): Promise<Member> => {
    const response = await requestApi(`/member`, API_METHOD_TYPE.GET);

    if (response.status != API_STATUS.SUCCESS) {
        throw new ApiError(i18n.t("error.api.member.get"), response.status); 
    }

    const data: MemberSavedResponse = await response.json();
    return {...data};

}

export const postMember = async (member: Member) => {
    const requestBody: MemberSaveRequest = member;

    const response = await requestApi(`/member`, API_METHOD_TYPE.POST, requestBody);

    if (response.status != API_STATUS.CREATED) {
        throw new ApiError(i18n.t("error.api.member.post"), response.status);
    }
}

export const deleteMember = async () => {
    const response = await requestApi(`/member`, API_METHOD_TYPE.DELETE);

    if (response.status != API_STATUS.NO_CONTENT) {
        throw new ApiError(i18n.t("error.api.member.delete"), response.status);
    }
}
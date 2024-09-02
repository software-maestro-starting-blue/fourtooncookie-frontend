import { LocalDate } from "@js-joda/core";


export interface MemberCreateRequest {
    name: string;
    birth: LocalDate;
    gender: string;
}

export interface MemberSavedResponse {
    email: string;
    name: string;
    gender: string;
    birth: LocalDate;
}

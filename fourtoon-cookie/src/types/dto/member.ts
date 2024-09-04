import { LocalDate } from "@js-joda/core";


export interface MemberSaveRequest {
    name: string;
    birth: LocalDate;
    gender: string;
}

export interface MemberSavedResponse {
    name: string;
    gender: string;
    birth: LocalDate;
}

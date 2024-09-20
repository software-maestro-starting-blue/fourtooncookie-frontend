import { LocalDate } from "@js-joda/core";
import { Gender } from "../gender";


export interface MemberSaveRequest {
    name: string;
    birth: LocalDate;
    gender: string;
}

export interface MemberSavedResponse {
    email: string;
    name: string;
    gender: Gender;
    birth: LocalDate;
}

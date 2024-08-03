import { LocalDate } from "@js-joda/core";

export interface Member {
    email: string;
    name: string;
    gender: string;
    birth: LocalDate;
}
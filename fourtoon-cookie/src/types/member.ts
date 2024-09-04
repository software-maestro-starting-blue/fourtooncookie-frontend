import { LocalDate } from "@js-joda/core"

export interface Member {
    name: string,
    email: string,
    gender: string,
    birth: LocalDate
};

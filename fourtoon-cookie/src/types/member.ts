import { LocalDate } from "@js-joda/core"
import { Gender } from "./gender"

export interface Member {
    name: string,
    gender: Gender,
    birth: LocalDate
};

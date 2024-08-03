

export interface MemberUpdateRequest {
    name: string;
    birth: Date;
    gender: string;
}

export interface MemberSavedResponse {
    email: string;
    name: string;
    gender: string;
    birth: Date;
}
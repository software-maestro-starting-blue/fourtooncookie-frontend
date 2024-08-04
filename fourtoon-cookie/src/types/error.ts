
export enum GlobalErrorInfoType {
    MODAL
}

export interface GlobalErrorInfo {
    error: Error;
    type: GlobalErrorInfoType;
}
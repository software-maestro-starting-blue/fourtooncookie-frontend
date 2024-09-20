
export enum GlobalErrorInfoType {
    ALERT
}

export interface GlobalErrorInfo {
    error: Error;
    type: GlobalErrorInfoType;
}
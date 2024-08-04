
export enum GlobalErrorInfoType {
    MODAL
}

export interface GlobalErrorInfo {
    message: string;
    type: GlobalErrorInfoType;
    callback?: () => void;
}
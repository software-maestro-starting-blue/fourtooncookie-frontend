import { DependencyList, useEffect } from "react";
import { useAccountStore } from "../store/account";
import { AccountStatus } from "../types/account";


export const useEffectWithAccountStatus = (callback: (state: AccountStatus) => void, deps: DependencyList = []) => {
    const { jwt, member, getAccountStatus } = useAccountStore();

    useEffect(() => {
        callback(getAccountStatus());
    }, [jwt, member, getAccountStatus, ...deps]);
}
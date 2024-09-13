import { DependencyList, useEffect } from "react";
import { useAccountStore } from "../store/account";


export const useEffectWithAccountStore = (callback: () => void, deps: DependencyList = []) => {
    const { jwt, member } = useAccountStore();

    useEffect(() => {
        callback();
    }, [jwt, member, ...deps]);
}
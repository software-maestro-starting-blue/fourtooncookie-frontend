import { useEffect, useState } from "react";
import { AccountStatus } from "../types/account";
import { JWTToken } from "../types/jwt";
import { Member } from "../types/member";
import { useCreateMember, useDeleteMember, useMember } from "./server/member";
import { asyncFunctionWithErrorHandling } from "./error";
import { useJwtStore } from "./store/jwt";


export const useAccountState = () => {
    const [ accountState, setAccountState ] = useState<AccountStatus>(AccountStatus.UNAUTHORIZED);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const { token, setToken, removeToken } = useJwtStore();

    const { data: member, refetch } = useMember();

    const { mutate: createMember } = useCreateMember();
    const { mutate: deleteMember } = useDeleteMember();

    useEffect(() => {
        if (isLoading) {
            return;
        }
        
        if (member) {
            setAccountState(AccountStatus.LOGINED);
            return;
        }

        if (token) {
            setAccountState(AccountStatus.UNSIGNEDUP);
            return;
        }

        setAccountState(AccountStatus.UNAUTHORIZED);

    }, [isLoading, member, token]);
    
    const asyncWithLoading = <Args extends any[]>(func: (...args: Args) => Promise<void>) => {
        return async (...args: Args) => {
            setIsLoading(true);
            try {
                await func(...args);
            } finally {
                setIsLoading(false);
            }
        };
    };
    
    const login = asyncFunctionWithErrorHandling(asyncWithLoading(async (token: JWTToken) => {
        setToken(token);
        await refetch();
    }));

    const signup = asyncFunctionWithErrorHandling(asyncWithLoading(async (member: Member) => {
        await createMember(member);
    }));

    const logout = asyncFunctionWithErrorHandling(asyncWithLoading(async () => {
        removeToken();
        await refetch();
    }));

    const resign = asyncFunctionWithErrorHandling(asyncWithLoading(async () => {
        await deleteMember();
    }));

    return {
        accountState,
        login,
        signup,
        logout,
        resign
    }
    
}
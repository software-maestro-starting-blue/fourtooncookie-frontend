import { useEffect, useState } from "react";
import { AccountStatus } from "../types/account";
import { JWTToken } from "../types/jwt";
import { Member } from "../types/member";
import { useCreateMember, useDeleteMember, useMember } from "./server/member";
import { useJwtStore } from "../store/jwt";


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
    
    const login = async (token: JWTToken) => {
        setIsLoading(true);
        setToken(token);
        await refetch();
        setIsLoading(false);
    }

    const signup = async (member: Member) => {
        setIsLoading(true);
        await createMember(member);
        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        removeToken();
        await refetch();
        setIsLoading(false);
    }

    const resign = async () => {
        setIsLoading(true);
        await deleteMember();
        setIsLoading(false);
    }

    return {
        accountState,
        login,
        signup,
        logout,
        resign
    }
    
}
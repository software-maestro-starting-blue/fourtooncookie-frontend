import { useQuery, useQueryClient } from "react-query";
import { deleteMember, getMember, postMember } from "../../apis/member"
import { Member } from "../../types/member";
import { useMutationWithErrorHandling } from "../error";
import { JwtError } from "../../types/error/JwtError";
import { useJwtStore } from "../store/jwt";

export const useMember = () => {
    const queryClient = useQueryClient();
    const { token, removeToken } = useJwtStore();

    return useQuery<Member, Error>('member', getMember, { //TODO 추후에 error handling 관련하여 논의 필요
        enabled: !!token,
        retry: false,
        onError: (error) => {
            if (error instanceof JwtError) {
                removeToken();
                queryClient.cancelQueries('member', { exact: true });
                queryClient.removeQueries('member', { exact: true });
                return;
            }
        }
    });
}

export const useCreateMember = () => {
    const queryClient = useQueryClient();

    return useMutationWithErrorHandling<void, Error, Member>(postMember,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('member', { exact: true });
            }
        }
    );
}

export const useDeleteMember = () => {
    const queryClient = useQueryClient();
    const { removeToken } = useJwtStore();

    return useMutationWithErrorHandling<void, Error, void>(deleteMember, {
        onSuccess: () => {
            queryClient.cancelQueries('member', { exact: true });
            queryClient.removeQueries('member', { exact: true });
            removeToken();
        }
    });
}  
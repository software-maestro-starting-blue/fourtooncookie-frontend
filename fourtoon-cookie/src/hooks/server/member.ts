import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteMember, getMember, postMember } from "../../apis/member"
import { Member } from "../../types/member";
import { JwtError } from "../../error/JwtError";
import { useJwtStore } from "../../store/jwt";
import { useMutationWithErrorHandling, useQueryWithErrorHandling } from "../error";

export const useMember = () => {
    const queryClient = useQueryClient();
    const { token, removeToken } = useJwtStore();

    return useQueryWithErrorHandling<Member, Error>('member', getMember, {
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
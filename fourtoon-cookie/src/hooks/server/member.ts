import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteMember, getMember, postMember } from "../../apis/member"
import { Member } from "../../types/member";
import { JwtError } from "../../error/JwtError";
import { useJwtStore } from "../../store/jwt";

export const useMember = () => {
    const queryClient = useQueryClient();
    const { token, removeToken } = useJwtStore();

    return useQuery<Member, Error>('member', getMember, {
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

    return useMutation<void, Error, Member>('member', postMember,
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

    return useMutation<void, Error, void>('member', deleteMember, {
        onSuccess: () => {
            queryClient.cancelQueries('member', { exact: true });
            queryClient.removeQueries('member', { exact: true });
            removeToken();
        }
    });
}  
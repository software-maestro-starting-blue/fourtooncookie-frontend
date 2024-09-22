import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteMember, getMember, postMember } from "../../apis/member"
import { Member } from "../../types/member";


export const useMember = () => {
    return useQuery<Member, Error>('member', () => getMember());
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

    return useMutation<void, Error, void>('member', deleteMember, {
        onSuccess: () => {
            queryClient.cancelQueries('member', { exact: true });
            queryClient.removeQueries('member', { exact: true });
        }
    });
}  
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Member } from "../types/member";
import { useJWTStore } from "./jwt";
import { deleteMember, getMember, postMember } from "../apis/member";


export interface MemberState {
    member: Member | null;
    signupMember: (member: Member) => void;
    reloadMember: () => void;
    logoutMember: () => void;
    resignMember: () => void;
    updateMember: (member: Member) => void;
}


export const useMemberStore = create(
    persist<MemberState>((set) => ({
        member: null,

        signupMember: async (member: Member) => {
            await postMember(member.name, member.birth, member.gender);
            set({ member });
        },

        reloadMember: async () => {
            try {
                const member = await getMember();
                set({ member });
            } catch (e) {
                set({ member: null });
            }
        },

        logoutMember: async () => {
            set({ member: null });
            await useJWTStore.getState().removeJWT();
        },

        resignMember: async () => {
            await deleteMember();
            set({ member: null });
            useJWTStore.getState().removeJWT();
        },

        updateMember: async (member: Member) => {
            //TODO 추후 API에 멤버 정보 수정 기능이 추가되면 구현
        }
    }), 
    {
        name: "member-storage",
        partialize: (state: MemberState) => ({ member: state.member }),
        storage: {
            getItem: async (name) => {
                const item = await AsyncStorage.getItem(name);
                return item ? JSON.parse(item) : null;
            },
            setItem: async (name, value) => {
                await AsyncStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: async (name) => {
                await AsyncStorage.removeItem(name);
            },
        }
    } as PersistOptions<MemberState>
));
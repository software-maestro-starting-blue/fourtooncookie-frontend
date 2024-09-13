import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "../auth/supabase";
import { JwtError } from "../error/JwtError";
import { Member } from "../types/member";
import { deleteMember, getMember, postMember } from "../apis/member";
import { AccountStatus } from "../types/account";
import { ApiError } from "../error/ApiError";
import { API_STATUS } from "../constants/api";


interface AccountState {
    jwt: JWTToken | null;
    refreshJWT: () => void;

    member: Member | null;
    loginMember: (jwt: JWTToken) => void;
    signupMember: (member: Member) => void;
    reloadMember: () => void;
    logoutMember: () => void;
    resignMember: () => void;
    updateMember: (member: Member) => void;
    getAccountStatus: () => AccountStatus;
}


export const useAccountStore = create(
    persist<AccountState>(
        (set, get) => ({
            jwt: null,

            refreshJWT: async () => {
                const state: AccountState = get();

                if (!state.jwt) {
                    throw new JwtError("사용자 정보가 존재하지 않습니다. 다시 로그인해 주세요.");
                }

                try {
                    const newToken = await supabaseRefreshToken(state.jwt.refreshToken);
                    set({ jwt: newToken });
                } catch (error) {
                    set({ jwt: null, member: null });
                    throw new JwtError("로그인 정보 유지에 실패하였습니다. 다시 로그인해 주세요.");
                }
            },

            member: null,

            loginMember: async (jwt: JWTToken) => {
                try {
                    const member = await getMember(jwt);
                    set({ jwt, member });
                } catch (e) {
                    if (e instanceof ApiError && e.getStatus() === API_STATUS.NOT_FOUND) {
                        set({ jwt: jwt, member: null });
                        return;
                    }

                    set({ jwt: null, member: null }); //TODO: 추후에는 에러 핸들링으로 처리
                }
            },

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
                set({ 
                    jwt: null,
                    member: null,
                });
            },

            resignMember: async () => {
                await deleteMember();
                set({ 
                    jwt: null,
                    member: null,
                });
            },

            updateMember: async (member: Member) => {
                //TODO 추후 API에 멤버 정보 수정 기능이 추가되면 구현
            },

            getAccountStatus: () : AccountStatus => {
                const state: AccountState = get();
                if (state.jwt && state.member) return AccountStatus.LOGINED;
                if (state.jwt) return AccountStatus.UNSIGNEDUP;
                return AccountStatus.UNAUTHORIZED;
            }
        }),
        {
            name: "account-storage",
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
            },
        }
    )
);
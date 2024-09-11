import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "../auth/supabase";
import { JwtError } from "../error/JwtError";


interface JWTState {
    jwt: JWTToken | null;
    setJWT: (jwt: JWTToken) => void;
    removeJWT: () => void;
    refreshJWT: () => void;
}


const useJWTStore = create(
    persist<JWTState>(
        (set, get) => ({
            jwt: null,

            setJWT: (jwt: JWTToken) => set({ jwt }),

            removeJWT: () => set({ jwt: null }),

            refreshJWT: async () => {
                const state: JWTState = get();

                if (!state.jwt) {
                    throw new JwtError("사용자 정보가 존재하지 않습니다. 다시 로그인해 주세요.");
                }

                try {
                    const newToken = await supabaseRefreshToken(state.jwt.refreshToken);
                    set({ jwt: newToken });
                } catch (error) {
                    set({ jwt: null });
                    throw new JwtError("로그인 정보 유지에 실패하였습니다. 다시 로그인해 주세요.");
                }
            },
        }),
        {
            name: "jwt-storage",
            getStorage: () => AsyncStorage,
        }
    )
);
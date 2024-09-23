import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JWTToken } from "../types/jwt";
import { supabaseRefreshToken } from "../auth/supabase";

interface JwtState {
    token: JWTToken | null;
    setToken: (token: JWTToken) => void;
    refreshToken: () => void;
    removeToken: () => void;
    getToken: () => JWTToken | null;
}

export const useJwtStore = create(
    persist<JwtState>(
        (set, get) => ({
            token: null,

            setToken: (token: JWTToken) => set({ token }),

            refreshToken: async () => {
                const { token } = get();

                if (! token) {
                    return;
                }

                const newToken = await supabaseRefreshToken(token.refreshToken);
                set({ token: newToken });
            },

            removeToken: () => set({ token: null }),

            getToken: () => get().token,
        }),
        {
            name: 'jwt-store',
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
)
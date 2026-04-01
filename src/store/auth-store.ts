import {create} from "zustand";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {LoginResponse, User} from "@/shared/types";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, role?: string) => Promise<void>;
    demoLogin: () => Promise<void>;
    logout: () => void;
    loadFromStorage: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({isLoading: true, error: null});
        try {
            const data = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.auth.login,
                {email, password}
            );
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err instanceof Error ? err.message : "Login failed",
            });
            throw err;
        }
    },

    register: async (username, email, password, role = "manager") => {
        set({isLoading: true, error: null});
        try {
            await apiClient.post(API_ENDPOINTS.auth.register, {
                username,
                email,
                password,
                role,
            });
            set({isLoading: false});
        } catch (err) {
            set({
                isLoading: false,
                error: err instanceof Error ? err.message : "Registration failed",
            });
            throw err;
        }
    },

    demoLogin: async () => {
        set({isLoading: true, error: null});
        try {
            const data = await apiClient.post<LoginResponse>(
                API_ENDPOINTS.auth.login,
                {email: "demo@admin.com", password: "demo123"}
            );
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            set({
                user: data.user,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (err) {
            set({
                isLoading: false,
                error: err instanceof Error ? err.message : "Demo login failed",
            });
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({user: null, token: null, isAuthenticated: false});
        window.location.href = "/login";
    },

    loadFromStorage: () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr) as User;
                set({user, token, isAuthenticated: true});
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
    },

    clearError: () => set({error: null}),
}));

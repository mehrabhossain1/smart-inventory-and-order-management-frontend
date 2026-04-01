import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/store/auth-store";

describe("Auth Store", () => {
    beforeEach(() => {
        localStorage.clear();
        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
    });

    it("starts with unauthenticated state", () => {
        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.token).toBeNull();
    });

    it("loads user from localStorage", () => {
        const mockUser = {
            id: "123",
            username: "testuser",
            email: "test@test.com",
            role: "admin" as const,
        };
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("user", JSON.stringify(mockUser));

        useAuthStore.getState().loadFromStorage();

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.token).toBe("mock-token");
        expect(state.user?.username).toBe("testuser");
    });

    it("handles corrupted localStorage gracefully", () => {
        localStorage.setItem("token", "mock-token");
        localStorage.setItem("user", "invalid-json");

        useAuthStore.getState().loadFromStorage();

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(localStorage.getItem("token")).toBeNull();
    });

    it("clears error", () => {
        useAuthStore.setState({ error: "Some error" });
        expect(useAuthStore.getState().error).toBe("Some error");

        useAuthStore.getState().clearError();
        expect(useAuthStore.getState().error).toBeNull();
    });

    it("does not load if no token in localStorage", () => {
        useAuthStore.getState().loadFromStorage();

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
    });
});

import {create} from "zustand";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";

interface MessageStoreState {
    unreadCount: number;
    fetchUnreadCount: () => Promise<void>;
    incrementUnread: () => void;
    clearUnreadFor: (contactId: string) => void;
}

export const useMessageStore = create<MessageStoreState>((set) => ({
    unreadCount: 0,

    fetchUnreadCount: async () => {
        try {
            const data = await apiClient.get<{ unreadCount: number }>(
                API_ENDPOINTS.messages.unreadCount
            );
            set({unreadCount: data.unreadCount || 0});
        } catch {
            // silently fail
        }
    },

    incrementUnread: () => {
        set((s) => ({unreadCount: s.unreadCount + 1}));
    },

    clearUnreadFor: () => {
        // Re-fetch to get accurate count after marking messages as read
        apiClient
            .get<{ unreadCount: number }>(API_ENDPOINTS.messages.unreadCount)
            .then((data) => set({unreadCount: data.unreadCount || 0}))
            .catch(() => {});
    },
}));

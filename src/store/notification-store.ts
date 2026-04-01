import {create} from "zustand";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";

export interface Notification {
    _id: string;
    recipient: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
    read: boolean;
    readAt?: string;
    actionUrl?: string;
    createdAt: string;
}

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    panelOpen: boolean;
    setPanelOpen: (open: boolean) => void;
    togglePanel: () => void;
    fetchNotifications: () => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    addRealTimeNotification: (notification: Partial<Notification>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    panelOpen: false,

    setPanelOpen: (open) => set({panelOpen: open}),
    togglePanel: () => set((s) => ({panelOpen: !s.panelOpen})),

    fetchNotifications: async () => {
        set({loading: true});
        try {
            const data = await apiClient.get<{
                notifications: Notification[];
                unreadCount: number;
            }>(API_ENDPOINTS.notifications.list, {limit: 30});
            set({
                notifications: data.notifications || [],
                unreadCount: data.unreadCount || 0,
                loading: false,
            });
        } catch {
            set({loading: false});
        }
    },

    fetchUnreadCount: async () => {
        try {
            const data = await apiClient.get<{ unreadCount: number }>(
                API_ENDPOINTS.notifications.unreadCount
            );
            set({unreadCount: data.unreadCount || 0});
        } catch {
            // silently fail
        }
    },

    markAsRead: async (id) => {
        try {
            await apiClient.put(API_ENDPOINTS.notifications.markRead(id));
            set((s) => ({
                notifications: s.notifications.map((n) =>
                    n._id === id ? {...n, read: true, readAt: new Date().toISOString()} : n
                ),
                unreadCount: Math.max(0, s.unreadCount - 1),
            }));
        } catch {
            // silently fail
        }
    },

    markAllAsRead: async () => {
        try {
            await apiClient.put(API_ENDPOINTS.notifications.markAllRead);
            set((s) => ({
                notifications: s.notifications.map((n) => ({
                    ...n,
                    read: true,
                    readAt: new Date().toISOString(),
                })),
                unreadCount: 0,
            }));
        } catch {
            // silently fail
        }
    },

    deleteNotification: async (id) => {
        try {
            await apiClient.del(API_ENDPOINTS.notifications.delete(id));
            const wasUnread = get().notifications.find((n) => n._id === id && !n.read);
            set((s) => ({
                notifications: s.notifications.filter((n) => n._id !== id),
                unreadCount: wasUnread ? Math.max(0, s.unreadCount - 1) : s.unreadCount,
            }));
        } catch {
            // silently fail
        }
    },

    addRealTimeNotification: (notification) => {
        const newNotif: Notification = {
            _id: `temp-${Date.now()}`,
            recipient: "",
            type: notification.type || "",
            title: notification.title || "",
            message: notification.message || "",
            data: {},
            read: false,
            actionUrl: notification.actionUrl,
            createdAt: notification.createdAt || new Date().toISOString(),
        };
        set((s) => ({
            notifications: [newNotif, ...s.notifications].slice(0, 50),
            unreadCount: s.unreadCount + 1,
        }));
    },
}));

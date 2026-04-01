export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://smart-inventory-and-order-management.onrender.com/api";

export const API_ENDPOINTS = {
    auth: {
        register: "/auth/register",
        login: "/auth/login",
    },
    users: {
        me: "/users/me",
    },
    categories: {
        list: "/categories",
        byId: (id: string) => `/categories/${id}`,
    },
    products: {
        list: "/products",
        byId: (id: string) => `/products/${id}`,
    },
    orders: {
        list: "/orders",
        byId: (id: string) => `/orders/${id}`,
        status: (id: string) => `/orders/${id}/status`,
        cancel: (id: string) => `/orders/${id}/cancel`,
    },
    restock: {
        queue: "/restock/queue",
        restock: (productId: string) => `/restock/restock/${productId}`,
        remove: (id: string) => `/restock/queue/${id}`,
    },
    dashboard: {
        summary: "/dashboard/summary",
        analytics: "/dashboard/analytics",
    },
    activity: {
        recent: "/activity/recent",
    },
    notifications: {
        list: "/notifications",
        unreadCount: "/notifications/unread-count",
        markRead: (id: string) => `/notifications/${id}/read`,
        markAllRead: "/notifications/read-all",
        delete: (id: string) => `/notifications/${id}`,
    },
    messages: {
        conversations: "/messages/conversations",
        contacts: "/messages/contacts",
        unreadCount: "/messages/unread-count",
        withContact: (contactId: string) => `/messages/${contactId}`,
        send: "/messages",
    },
    system: {
        health: "/system/health",
    },
    ping: "/ping",
} as const;

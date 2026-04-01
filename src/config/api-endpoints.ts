export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://stock-sales-management-backend.onrender.com/api";

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
    },
    activity: {
        recent: "/activity/recent",
    },
    ping: "/ping",
} as const;

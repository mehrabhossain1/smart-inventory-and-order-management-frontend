export const PATHS = {
    home: "/",
    auth: {
        login: "/login",
        register: "/register",
    },
    dashboard: {
        home: "/dashboard",
        products: "/dashboard/products",
        categories: "/dashboard/categories",
        orders: "/dashboard/orders",
        orderDetail: (id: string) => `/dashboard/orders/${id}`,
        restock: "/dashboard/restock",
        activity: "/dashboard/activity",
        messages: "/dashboard/messages",
        system: "/dashboard/system",
    },
} as const;

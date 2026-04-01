export interface AuthSlide {
    image?: string;
    title: string;
    subtitle: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    role: "admin" | "manager";
    fullName?: string;
    phone?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    name: string;
    category: Category | string;
    price: number;
    quantity: number;
    minimumStockThreshold: number;
    status: "Active" | "Out of Stock";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    product: Pick<Product, "_id" | "name" | "price" | "quantity" | "status"> | string;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    customerName: string;
    products: OrderItem[];
    totalPrice: number;
    status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
    createdBy: Pick<User, "_id" | "username" | "email"> | string;
    createdAt: string;
    updatedAt: string;
}

export interface RestockQueueItem {
    _id: string;
    product: Pick<Product, "_id" | "name" | "quantity" | "price" | "status" | "minimumStockThreshold">;
    currentStock: number;
    threshold: number;
    priority: "High" | "Medium" | "Low";
    createdAt: string;
    updatedAt: string;
}

export interface DashboardSummary {
    ordersToday: number;
    ordersByStatus: {
        Pending: number;
        Confirmed: number;
        Shipped: number;
        Delivered: number;
        Cancelled: number;
    };
    lowStockItems: number;
    revenueToday: number;
    topLowStockProducts: Pick<Product, "_id" | "name" | "quantity" | "minimumStockThreshold" | "status">[];
    recentActivity: ActivityLog[];
}

export interface ActivityLog {
    _id: string;
    action: string;
    performedBy: Pick<User, "_id" | "username"> | string;
    targetModel: string;
    targetId?: string;
    details?: string;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    message: string;
    count: number;
    total: number;
    page: number;
    limit: number;
    items?: T[];
    products?: T[];
    orders?: T[];
    categories?: T[];
}

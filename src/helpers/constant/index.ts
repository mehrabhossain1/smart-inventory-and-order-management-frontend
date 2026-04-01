import { PATHS } from "@/config/paths";
import { AuthSlide } from "@/shared/types";

export const loginSlides: AuthSlide[] = [
    {
        title: "Welcome Back!",
        subtitle: "Manage your inventory and orders efficiently",
    },
    {
        title: "Real-Time Stock Tracking",
        subtitle: "Stay on top of your product levels and restock needs",
    },
    {
        title: "Streamlined Orders",
        subtitle: "Create, track, and fulfill orders with ease",
    },
];

export const registerSlides: AuthSlide[] = [
    {
        title: "Get Started Today",
        subtitle: "Set up your inventory management in minutes",
    },
    {
        title: "Smart Stock Alerts",
        subtitle: "Never run out of stock with automatic restock notifications",
    },
    {
        title: "Complete Visibility",
        subtitle: "Dashboard insights for data-driven decisions",
    },
];

export const sidebarLinks = [
    { name: "Dashboard", href: PATHS.dashboard.home, icon: "LayoutDashboard" },
    {
        name: "Categories",
        href: PATHS.dashboard.categories,
        icon: "FolderTree",
    },
    { name: "Products", href: PATHS.dashboard.products, icon: "Package" },
    { name: "Orders", href: PATHS.dashboard.orders, icon: "ShoppingCart" },
    {
        name: "Restock Queue",
        href: PATHS.dashboard.restock,
        icon: "AlertTriangle",
    },
    { name: "Activity Log", href: PATHS.dashboard.activity, icon: "Activity" },
];

export const orderStatuses = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
] as const;

export const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    Shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Delivered: "bg-green-100 text-green-800 border-green-200",
    Cancelled: "bg-red-100 text-red-800 border-red-200",
    Active: "bg-green-100 text-green-800 border-green-200",
    "Out of Stock": "bg-red-100 text-red-800 border-red-200",
};

export const priorityColors: Record<string, string> = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-amber-100 text-amber-800 border-amber-200",
    Low: "bg-blue-100 text-blue-800 border-blue-200",
};

export const demoCredentials = {
    email: "demo@admin.com",
    password: "demo1234",
};

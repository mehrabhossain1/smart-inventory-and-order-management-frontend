import { PATHS } from "@/config/paths";
import { AuthSlide } from "@/shared/types";

export const loginSlides: AuthSlide[] = [
    {
        image: "/inventory-hero.svg",
        title: "Welcome Back!",
        subtitle: "Manage your inventory and orders efficiently",
    },
    {
        image: "/stock-tracking.svg",
        title: "Real-Time Stock Tracking",
        subtitle: "Stay on top of your product levels and restock needs",
    },
    {
        image: "/order-management.svg",
        title: "Streamlined Orders",
        subtitle: "Create, track, and fulfill orders with ease",
    },
];

export const registerSlides: AuthSlide[] = [
    {
        image: "/inventory-hero.svg",
        title: "Get Started Today",
        subtitle: "Set up your inventory management in minutes",
    },
    {
        image: "/stock-tracking.svg",
        title: "Smart Stock Alerts",
        subtitle: "Never run out of stock with automatic restock notifications",
    },
    {
        image: "/order-management.svg",
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
    { name: "Messages", href: PATHS.dashboard.messages, icon: "MessageSquare" },
];

export const orderStatuses = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
] as const;

export const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600 border-amber-200/60 rounded-full",
    Confirmed: "bg-blue-50 text-blue-600 border-blue-200/60 rounded-full",
    Shipped: "bg-violet-50 text-violet-600 border-violet-200/60 rounded-full",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-200/60 rounded-full",
    Cancelled: "bg-red-50 text-red-500 border-red-200/60 rounded-full",
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200/60 rounded-full",
    "Out of Stock": "bg-red-50 text-red-500 border-red-200/60 rounded-full",
};

export const priorityColors: Record<string, string> = {
    High: "bg-red-50 text-red-600 border-red-200/60 rounded-full",
    Medium: "bg-amber-50 text-amber-600 border-amber-200/60 rounded-full",
    Low: "bg-sky-50 text-sky-600 border-sky-200/60 rounded-full",
};

export const demoCredentials = {
    email: "demo@admin.com",
    password: "demo123",
};

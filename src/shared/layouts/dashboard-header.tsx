"use client";

import {usePathname} from "next/navigation";
import {useGlobalStore} from "@/store";
import {useAuthStore} from "@/store/auth-store";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/products": "Products",
    "/dashboard/categories": "Categories",
    "/dashboard/orders": "Orders",
    "/dashboard/restock": "Restock Queue",
    "/dashboard/activity": "Activity Log",
};

export function DashboardHeader() {
    const pathname = usePathname();
    const {toggleSidebar} = useGlobalStore();
    const {user} = useAuthStore();

    const title = pageTitles[pathname] || (pathname.startsWith("/dashboard/orders/") ? "Order Details" : "Dashboard");

    return (
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-5"/>
                </Button>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:block">
                    {user?.email}
                </span>
                <div className="size-8 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light font-semibold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
            </div>
        </header>
    );
}

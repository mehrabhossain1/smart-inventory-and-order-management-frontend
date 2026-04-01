"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useGlobalStore} from "@/store";
import {useAuthStore} from "@/store/auth-store";
import {Button} from "@/components/ui/button";
import Image from "next/image";
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
        <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-5"/>
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <Image src="/icon.svg" alt="Smart Inventory" width={32} height={32} className="rounded-lg"/>
                    <span className="text-lg tracking-tight">
                        <span className="font-viga text-primary-light">Smart</span>
                        <span className="font-viga text-foreground">Inventory</span>
                    </span>
                </Link>
                <div className="hidden sm:block h-6 w-px bg-gray-200"/>
                <h1 className="hidden sm:block text-lg font-semibold text-gray-900">{title}</h1>
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

"use client";

import Link from "next/link";
import Image from "next/image";
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
        <header className="h-16 shrink-0 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-slate-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-5 text-slate-600"/>
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <Image src="/icon.svg" alt="Smart Inventory" width={32} height={32} className="rounded-lg"/>
                    <span className="text-lg tracking-tight">
                        <span className="font-viga text-primary-light">Smart</span>
                        <span className="font-viga text-slate-800">Inventory</span>
                    </span>
                </Link>
                <div className="hidden sm:block h-5 w-px bg-slate-200"/>
                <h1 className="hidden sm:block text-sm font-medium text-slate-500">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 hidden sm:block">
                    {user?.email}
                </span>
                <div className="size-9 rounded-full bg-gradient-to-br from-primary-light to-purple-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
            </div>
        </header>
    );
}

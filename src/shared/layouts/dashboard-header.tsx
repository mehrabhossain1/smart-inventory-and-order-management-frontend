"use client";

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";
import {useGlobalStore} from "@/store";
import {useAuthStore} from "@/store/auth-store";
import {Button} from "@/components/ui/button";
import {Menu, Sun, Moon, Wifi, WifiOff} from "lucide-react";
import {useSocket} from "@/shared/providers/socket-provider";
import {NotificationBell} from "@/features/notifications/notification-bell";
import {MessageBadge} from "@/features/messages/message-badge";
import {useEffect, useState} from "react";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/products": "Products",
    "/dashboard/categories": "Categories",
    "/dashboard/orders": "Orders",
    "/dashboard/restock": "Restock Queue",
    "/dashboard/activity": "Activity Log",
    "/dashboard/messages": "Messages",
    "/dashboard/system": "System Health",
};

export function DashboardHeader() {
    const pathname = usePathname();
    const {toggleSidebar} = useGlobalStore();
    const {user} = useAuthStore();
    const {theme, setTheme} = useTheme();
    const {connected} = useSocket();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true));
    }, []);

    const title = pageTitles[pathname] || (pathname.startsWith("/dashboard/orders/") ? "Order Details" : "Dashboard");

    return (
        <header className="relative h-16 shrink-0 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/[0.06] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-5 text-slate-600 dark:text-slate-400"/>
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <Image src="/icon.svg" alt="Smart Inventory" width={32} height={32} className="rounded-lg"/>
                    <span className="text-lg tracking-tight">
                        <span className="font-viga bg-gradient-to-r from-primary-light to-primary-lighter bg-clip-text text-transparent">Smart</span>
                        <span className="font-viga text-slate-800 dark:text-slate-100">Inventory</span>
                    </span>
                </Link>
                <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-700"/>
                <h1 className="hidden sm:block text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
                {mounted && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="size-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {theme === "dark" ? (
                            <Sun className="size-4 text-amber-400"/>
                        ) : (
                            <Moon className="size-4 text-slate-500"/>
                        )}
                    </Button>
                )}
                <MessageBadge/>
                <NotificationBell/>
                <div className="hidden sm:flex items-center gap-1.5" title={connected ? "Real-time connected" : "Real-time disconnected"}>
                    {connected ? (
                        <Wifi className="size-3.5 text-emerald-500"/>
                    ) : (
                        <WifiOff className="size-3.5 text-slate-400"/>
                    )}
                </div>
                <span className="text-sm text-slate-400 hidden sm:block">
                    {user?.email}
                </span>
                <div className="size-9 rounded-full bg-gradient-to-br from-primary-light to-purple-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-primary-light/20">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
        </header>
    );
}

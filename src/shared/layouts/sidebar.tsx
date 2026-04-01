"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useGlobalStore} from "@/store";
import {useAuthStore} from "@/store/auth-store";
import {sidebarLinks} from "@/helpers/constant";
import {
    LayoutDashboard,
    Package,
    FolderTree,
    ShoppingCart,
    AlertTriangle,
    Activity,
    LogOut,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Package,
    FolderTree,
    ShoppingCart,
    AlertTriangle,
    Activity,
};

export function Sidebar() {
    const pathname = usePathname();
    const {sidebarOpen, setSidebarOpen} = useGlobalStore();
    const {user, logout} = useAuthStore();

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-[260px] bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
                    sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                )}
            >
                <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const Icon = iconMap[link.icon];
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/dashboard" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.85rem] font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary-light text-white shadow-md shadow-primary-light/25"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {Icon && <Icon className={cn("size-[18px]", isActive ? "text-white" : "text-slate-400")}/>}
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mx-3 mb-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-9 rounded-full bg-gradient-to-br from-primary-light to-purple-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                                {user?.username}
                            </p>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-[10px] px-1.5 py-0 font-medium",
                                    user?.role === "admin"
                                        ? "border-primary-light/30 text-primary-light bg-primary-light/5"
                                        : "border-slate-300 text-slate-500 bg-white"
                                )}
                            >
                                {user?.role}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="w-full justify-start text-slate-400 hover:text-red-600 hover:bg-red-50/80 rounded-lg text-xs"
                    >
                        <LogOut className="size-3.5 mr-2"/>
                        Sign out
                    </Button>
                </div>
            </aside>
        </>
    );
}

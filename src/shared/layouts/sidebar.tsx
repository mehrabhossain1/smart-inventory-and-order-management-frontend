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
    X,
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
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Package className="size-6 text-primary-light"/>
                        <span className="text-lg font-viga text-foreground">
                            Smart Inventory
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="size-5"/>
                    </Button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary-light/10 text-primary-light"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                {Icon && <Icon className="size-5"/>}
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="size-9 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light font-semibold text-sm">
                            {user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.username}
                            </p>
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-[10px] px-1.5 py-0",
                                    user?.role === "admin"
                                        ? "border-primary-light text-primary-light"
                                        : "border-gray-400 text-gray-500"
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
                        className="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="size-4 mr-2"/>
                        Logout
                    </Button>
                </div>
            </aside>
        </>
    );
}

"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useNotificationStore} from "@/store/notification-store";
import {formatRelativeTime} from "@/helpers";
import {Button} from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    ShoppingCart, Package, AlertTriangle, RefreshCw, CheckCircle, XCircle, Trash2, CheckCheck, Bell,
} from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
    ORDER_CREATED: ShoppingCart,
    ORDER_STATUS_CHANGED: RefreshCw,
    ORDER_CANCELLED: XCircle,
    STOCK_UPDATED: Package,
    PRODUCT_RESTOCKED: CheckCircle,
    LOW_STOCK_ALERT: AlertTriangle,
    PRODUCT_CREATED: Package,
    PRODUCT_DELETED: Trash2,
};

const typeColors: Record<string, string> = {
    ORDER_CREATED: "bg-blue-50 dark:bg-blue-950/30 text-blue-500",
    ORDER_STATUS_CHANGED: "bg-violet-50 dark:bg-violet-950/30 text-violet-500",
    ORDER_CANCELLED: "bg-red-50 dark:bg-red-950/30 text-red-500",
    STOCK_UPDATED: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500",
    PRODUCT_RESTOCKED: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500",
    LOW_STOCK_ALERT: "bg-amber-50 dark:bg-amber-950/30 text-amber-500",
    PRODUCT_CREATED: "bg-primary-light/10 text-primary-light",
    PRODUCT_DELETED: "bg-red-50 dark:bg-red-950/30 text-red-500",
};

export function NotificationPanel() {
    const router = useRouter();
    const {
        notifications, unreadCount, loading, panelOpen,
        setPanelOpen, fetchNotifications, markAsRead, markAllAsRead, deleteNotification,
    } = useNotificationStore();

    useEffect(() => {
        if (panelOpen) {
            fetchNotifications();
        }
    }, [panelOpen, fetchNotifications]);

    const handleClick = (notification: typeof notifications[0]) => {
        if (!notification.read) {
            markAsRead(notification._id);
        }
        if (notification.actionUrl) {
            router.push(notification.actionUrl);
            setPanelOpen(false);
        }
    };

    return (
        <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
            <SheetContent className="w-full sm:w-[420px] p-0 flex flex-col">
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-base">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 text-xs font-normal text-slate-400">
                                    {unreadCount} unread
                                </span>
                            )}
                        </SheetTitle>
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="text-xs text-primary-light hover:text-primary-light/80 rounded-lg"
                            >
                                <CheckCheck className="size-3.5 mr-1"/>
                                Mark all read
                            </Button>
                        )}
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    {loading && notifications.length === 0 ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="size-6 border-2 border-primary-light border-t-transparent rounded-full animate-spin"/>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-500">
                            <Bell className="size-8 mb-2 opacity-40"/>
                            <p className="text-sm">No notifications yet</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                            {notifications.map((notification) => {
                                const Icon = typeIcons[notification.type] || Bell;
                                const colorClass = typeColors[notification.type] || "bg-slate-50 dark:bg-slate-800/50 text-slate-400";

                                return (
                                    <div
                                        key={notification._id}
                                        onClick={() => handleClick(notification)}
                                        className={cn(
                                            "flex items-start gap-3 px-5 py-4 cursor-pointer transition-colors duration-150",
                                            notification.read
                                                ? "bg-transparent hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                                : "bg-primary-light/[0.03] hover:bg-primary-light/[0.06]"
                                        )}
                                    >
                                        <div className={cn("size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5", colorClass)}>
                                            <Icon className="size-4"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className={cn(
                                                        "text-sm",
                                                        notification.read
                                                            ? "text-slate-500 dark:text-slate-400"
                                                            : "text-slate-800 dark:text-slate-200 font-medium"
                                                    )}>
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="size-2 rounded-full bg-primary-light shrink-0 mt-1.5"/>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                                                {formatRelativeTime(notification.createdAt)}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notification._id);
                                            }}
                                            className="size-7 shrink-0 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 opacity-0 group-hover:opacity-100 hover:opacity-100"
                                        >
                                            <Trash2 className="size-3"/>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

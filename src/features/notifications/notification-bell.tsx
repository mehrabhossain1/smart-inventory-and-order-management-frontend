"use client";

import {useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Bell} from "lucide-react";
import {useNotificationStore} from "@/store/notification-store";

export function NotificationBell() {
    const {unreadCount, togglePanel, fetchUnreadCount} = useNotificationStore();

    useEffect(() => {
        fetchUnreadCount();
        // Poll every 30 seconds as fallback
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, [fetchUnreadCount]);

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={togglePanel}
            className="size-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative"
        >
            <Bell className="size-4 text-slate-500 dark:text-slate-400"/>
            {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </Button>
    );
}

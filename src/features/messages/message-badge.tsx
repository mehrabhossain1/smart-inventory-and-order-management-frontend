"use client";

import Link from "next/link";
import {MessageSquare} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useMessageStore} from "@/store/message-store";

export function MessageBadge() {
    const {unreadCount} = useMessageStore();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            asChild
        >
            <Link href="/dashboard/messages">
                <MessageSquare className="size-4 text-slate-500 dark:text-slate-400"/>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold leading-none">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </Link>
        </Button>
    );
}

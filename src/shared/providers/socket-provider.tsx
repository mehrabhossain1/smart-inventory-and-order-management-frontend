"use client";

import {createContext, useContext, useEffect, useState, useCallback} from "react";
import {Socket} from "socket.io-client";
import {connectSocket, disconnectSocket} from "@/lib/socket";
import {useAuthStore} from "@/store/auth-store";
import {useNotificationStore} from "@/store/notification-store";
import {useMessageStore} from "@/store/message-store";
import {toast} from "sonner";
import {usePathname} from "next/navigation";

interface SocketContextValue {
    socket: Socket | null;
    connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({socket: null, connected: false});

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const {token, user} = useAuthStore();
    const {addRealTimeNotification, fetchUnreadCount: fetchNotifCount} = useNotificationStore();
    const {fetchUnreadCount: fetchMsgCount, incrementUnread} = useMessageStore();
    const pathname = usePathname();

    const currentUserId = user?._id || user?.id;

    const showNotification = useCallback((data: Record<string, unknown>) => {
        const title = (data.title as string) || "Notification";
        const message = (data.message as string) || "";
        toast.info(title, {description: message});

        addRealTimeNotification({
            type: data.type as string,
            title,
            message,
            actionUrl: data.actionUrl as string,
            createdAt: (data.timestamp as string) || new Date().toISOString(),
        });
    }, [addRealTimeNotification]);

    useEffect(() => {
        if (!token) return;

        const s = connectSocket(token);
        requestAnimationFrame(() => setSocket(s));

        s.on("connect", () => setConnected(true));
        s.on("disconnect", () => setConnected(false));

        // Targeted notifications (order/stock/restock)
        s.on("notification:new", (data: Record<string, unknown>) => {
            showNotification(data);
        });

        // Real-time messages
        s.on("message:new", (msg: Record<string, unknown>) => {
            const sender = msg.sender as Record<string, unknown> | undefined;
            const senderId = sender?._id as string;

            // Only show toast + increment if it's not our own message
            if (senderId && senderId !== currentUserId) {
                const senderName = (sender?.username as string) || "Someone";
                const content = (msg.content as string) || "";
                const preview = content.length > 60 ? content.slice(0, 60) + "..." : content;

                // Only increment unread if user is NOT on the messages page chatting with this person
                const isOnMessagesPage = pathname === "/dashboard/messages";
                if (!isOnMessagesPage) {
                    incrementUnread();
                    toast.info(`${senderName}`, {
                        description: preview,
                        action: {
                            label: "View",
                            onClick: () => {
                                window.location.href = "/dashboard/messages";
                            },
                        },
                    });
                }
            }

            // Dispatch for messages page to pick up
            window.dispatchEvent(new CustomEvent("socket:event", {
                detail: {event: "message:new", data: msg},
            }));
        });

        // Broadcast events for data refresh
        const broadcastEvents = ["order:created", "order:statusChanged", "order:cancelled", "stock:updated", "restock:changed"];
        for (const event of broadcastEvents) {
            s.on(event, (data: Record<string, unknown>) => {
                window.dispatchEvent(new CustomEvent("socket:event", {detail: {event, data}}));
            });
        }

        // Relay typing + online events via DOM events
        s.on("message:typing", (data: Record<string, unknown>) => {
            window.dispatchEvent(new CustomEvent("socket:event", {detail: {event: "message:typing", data}}));
        });
        s.on("user:online", (data: Record<string, unknown>) => {
            window.dispatchEvent(new CustomEvent("socket:event", {detail: {event: "user:online", data}}));
        });
        s.on("message:read", (data: Record<string, unknown>) => {
            window.dispatchEvent(new CustomEvent("socket:event", {detail: {event: "message:read", data}}));
        });

        // Fetch initial counts
        fetchNotifCount();
        fetchMsgCount();

        return () => {
            disconnectSocket();
            setSocket(null);
            setConnected(false);
        };
    }, [token, currentUserId, showNotification, fetchNotifCount, fetchMsgCount, incrementUnread, pathname]);

    return (
        <SocketContext.Provider value={{socket, connected}}>
            {children}
        </SocketContext.Provider>
    );
}

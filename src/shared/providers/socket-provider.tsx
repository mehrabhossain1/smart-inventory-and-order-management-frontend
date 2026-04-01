"use client";

import {createContext, useContext, useEffect, useState, useCallback} from "react";
import {Socket} from "socket.io-client";
import {connectSocket, disconnectSocket} from "@/lib/socket";
import {useAuthStore} from "@/store/auth-store";
import {useNotificationStore} from "@/store/notification-store";
import {toast} from "sonner";

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
    const {token} = useAuthStore();
    const {addRealTimeNotification, fetchUnreadCount} = useNotificationStore();

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
        setSocket(s);

        s.on("connect", () => setConnected(true));
        s.on("disconnect", () => setConnected(false));

        // Listen for targeted notifications
        s.on("notification:new", (data: Record<string, unknown>) => {
            showNotification(data);
        });

        // Listen for broadcast events (for data refresh)
        const broadcastEvents = ["order:created", "order:statusChanged", "order:cancelled", "stock:updated", "restock:changed"];
        for (const event of broadcastEvents) {
            s.on(event, (data: Record<string, unknown>) => {
                window.dispatchEvent(new CustomEvent("socket:event", {detail: {event, data}}));
            });
        }

        // Fetch initial unread count
        fetchUnreadCount();

        return () => {
            disconnectSocket();
            setSocket(null);
            setConnected(false);
        };
    }, [token, showNotification, fetchUnreadCount]);

    return (
        <SocketContext.Provider value={{socket, connected}}>
            {children}
        </SocketContext.Provider>
    );
}

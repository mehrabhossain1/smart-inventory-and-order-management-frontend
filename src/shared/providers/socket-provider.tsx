"use client";

import {createContext, useContext, useEffect, useState, useCallback} from "react";
import {Socket} from "socket.io-client";
import {connectSocket, disconnectSocket} from "@/lib/socket";
import {useAuthStore} from "@/store/auth-store";
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

    const showNotification = useCallback((event: string, data: Record<string, unknown>) => {
        switch (event) {
            case "order:created":
                toast.info(`New order from ${data.customerName || "a customer"}`);
                break;
            case "order:statusChanged":
                toast.info(`Order status changed to ${data.status}`);
                break;
            case "order:cancelled":
                toast.info("An order was cancelled");
                break;
            case "stock:updated":
                toast.info(`Stock updated for ${data.name || "a product"}`);
                break;
            case "restock:changed":
                toast.info(`${data.name || "Product"} restocked`);
                break;
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const s = connectSocket(token);
        setSocket(s);

        s.on("connect", () => setConnected(true));
        s.on("disconnect", () => setConnected(false));

        const events = ["order:created", "order:statusChanged", "order:cancelled", "stock:updated", "restock:changed"];
        for (const event of events) {
            s.on(event, (data: Record<string, unknown>) => {
                showNotification(event, data);
                // Dispatch custom DOM event so hooks can listen
                window.dispatchEvent(new CustomEvent("socket:event", {detail: {event, data}}));
            });
        }

        return () => {
            disconnectSocket();
            setSocket(null);
            setConnected(false);
        };
    }, [token, showNotification]);

    return (
        <SocketContext.Provider value={{socket, connected}}>
            {children}
        </SocketContext.Provider>
    );
}

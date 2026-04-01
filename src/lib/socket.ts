import {io, Socket} from "socket.io-client";
import {API_BASE_URL} from "@/config/api-endpoints";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
    return socket;
}

export function connectSocket(token: string): Socket {
    if (socket?.connected) return socket;

    const baseUrl = API_BASE_URL.replace("/api", "");

    socket = io(baseUrl, {
        auth: {token},
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
        console.log("Socket connected");
    });

    socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
        console.log("Socket error:", err.message);
    });

    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

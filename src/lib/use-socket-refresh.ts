import {useEffect} from "react";

export function useSocketRefresh(events: string[], onRefresh: () => void) {
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (events.includes(detail.event)) {
                onRefresh();
            }
        };

        window.addEventListener("socket:event", handler);
        return () => window.removeEventListener("socket:event", handler);
    }, [events, onRefresh]);
}

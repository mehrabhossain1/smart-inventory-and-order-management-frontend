"use client";

import {useCallback, useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {useSocketRefresh} from "@/lib/use-socket-refresh";
import type {RestockQueueItem} from "@/shared/types";

export function useRestock() {
    const [queue, setQueue] = useState<RestockQueueItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueue = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<{ queue: RestockQueueItem[] }>(
                API_ENDPOINTS.restock.queue
            );
            setQueue(data.queue || []);
        } catch (err) {
            console.error("Failed to fetch restock queue:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQueue();
    }, [fetchQueue]);

    useSocketRefresh(["restock:changed", "stock:updated", "order:created", "order:cancelled"], fetchQueue);

    return {queue, loading, refetch: fetchQueue};
}

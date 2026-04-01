"use client";

import {useCallback, useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {useSocketRefresh} from "@/lib/use-socket-refresh";
import type {Order} from "@/shared/types";

interface UseOrdersParams {
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    count: number;
}

export function useOrders(params: UseOrdersParams = {}) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<OrdersResponse>(
                API_ENDPOINTS.orders.list,
                {
                    status: params.status || undefined,
                    startDate: params.startDate || undefined,
                    endDate: params.endDate || undefined,
                    page: params.page || 1,
                    limit: params.limit || 10,
                }
            );
            setOrders(data.orders || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    }, [params.status, params.startDate, params.endDate, params.page, params.limit]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useSocketRefresh(["order:created", "order:statusChanged", "order:cancelled"], fetchOrders);

    return {orders, total, loading, refetch: fetchOrders};
}

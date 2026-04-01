"use client";

import {useCallback, useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {useSocketRefresh} from "@/lib/use-socket-refresh";
import type {Product} from "@/shared/types";

interface UseProductsParams {
    search?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
}

interface ProductsResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    count: number;
}

export function useProducts(params: UseProductsParams = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<ProductsResponse>(
                API_ENDPOINTS.products.list,
                {
                    search: params.search || undefined,
                    category: params.category || undefined,
                    status: params.status || undefined,
                    page: params.page || 1,
                    limit: params.limit || 10,
                }
            );
            setProducts(data.products || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    }, [params.search, params.category, params.status, params.page, params.limit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useSocketRefresh(["stock:updated", "order:created", "order:cancelled", "restock:changed"], fetchProducts);

    return {products, total, loading, refetch: fetchProducts};
}

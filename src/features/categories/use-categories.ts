"use client";

import {useCallback, useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {Category} from "@/shared/types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiClient.get<{ categories: Category[] }>(
                API_ENDPOINTS.categories.list
            );
            setCategories(data.categories || []);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {categories, loading, refetch: fetchCategories};
}

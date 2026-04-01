"use client";

import {useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {DashboardApiResponse, DashboardSummary} from "@/shared/types";
import {formatCurrency} from "@/helpers";
import {StatCard} from "./stat-card";
import {ProductSummary} from "./product-summary";
import {ActivityFeed} from "./activity-feed";
import {Skeleton} from "@/components/ui/skeleton";
import {
    ShoppingCart,
    Clock,
    CheckCircle,
    AlertTriangle,
    DollarSign,
} from "lucide-react";

export default function DashboardPage() {
    const [data, setData] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get<DashboardApiResponse>(API_ENDPOINTS.dashboard.summary)
            .then((res) => setData(res.dashboard))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Array.from({length: 5}).map((_, i) => (
                        <Skeleton key={i} className="h-24 rounded-xl"/>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-64 rounded-xl"/>
                    <Skeleton className="h-64 rounded-xl"/>
                </div>
            </div>
        );
    }

    if (!data) {
        return <p className="text-gray-500">Failed to load dashboard data.</p>;
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Orders Today"
                    value={data.totalOrdersToday}
                    icon={<ShoppingCart className="size-6"/>}
                />
                <StatCard
                    title="Pending Orders"
                    value={data.ordersByStatus.pending}
                    icon={<Clock className="size-6"/>}
                    iconClassName="bg-yellow-100 text-yellow-700"
                />
                <StatCard
                    title="Delivered"
                    value={data.ordersByStatus.delivered}
                    icon={<CheckCircle className="size-6"/>}
                    iconClassName="bg-green-100 text-green-700"
                />
                <StatCard
                    title="Low Stock Items"
                    value={data.lowStockItemsCount}
                    icon={<AlertTriangle className="size-6"/>}
                    iconClassName="bg-red-100 text-red-700"
                />
                <StatCard
                    title="Revenue Today"
                    value={formatCurrency(data.revenueToday)}
                    icon={<DollarSign className="size-6"/>}
                    iconClassName="bg-emerald-100 text-emerald-700"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductSummary products={data.productSummary || []}/>
                <ActivityFeed activities={data.recentActivity || []}/>
            </div>
        </div>
    );
}

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
            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Array.from({length: 5}).map((_, i) => (
                        <Skeleton key={i} className="h-[100px] rounded-2xl"/>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-72 rounded-2xl"/>
                    <Skeleton className="h-72 rounded-2xl"/>
                </div>
            </div>
        );
    }

    if (!data) {
        return <p className="text-slate-400">Failed to load dashboard data.</p>;
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Orders Today"
                    value={data.totalOrdersToday}
                    icon={<ShoppingCart className="size-5"/>}
                />
                <StatCard
                    title="Pending"
                    value={data.ordersByStatus.pending}
                    icon={<Clock className="size-5"/>}
                    iconClassName="bg-amber-50 text-amber-500"
                />
                <StatCard
                    title="Delivered"
                    value={data.ordersByStatus.delivered}
                    icon={<CheckCircle className="size-5"/>}
                    iconClassName="bg-emerald-50 text-emerald-500"
                />
                <StatCard
                    title="Low Stock"
                    value={data.lowStockItemsCount}
                    icon={<AlertTriangle className="size-5"/>}
                    iconClassName="bg-red-50 text-red-500"
                />
                <StatCard
                    title="Revenue Today"
                    value={formatCurrency(data.revenueToday)}
                    icon={<DollarSign className="size-5"/>}
                    iconClassName="bg-violet-50 text-violet-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProductSummary products={data.productSummary || []}/>
                <ActivityFeed activities={data.recentActivity || []}/>
            </div>
        </div>
    );
}

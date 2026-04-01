"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {DashboardApiResponse, DashboardSummary} from "@/shared/types";
import {formatCurrency} from "@/helpers";
import {StatCard} from "./stat-card";
import {ProductSummary} from "./product-summary";
import {ActivityFeed} from "./activity-feed";
import {AnalyticsCharts} from "./analytics-charts";
import {Skeleton} from "@/components/ui/skeleton";
import {
    ShoppingCart,
    Clock,
    CheckCircle,
    AlertTriangle,
    DollarSign,
} from "lucide-react";

const stagger = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {staggerChildren: 0.08}
    }
};

const fadeUp = {
    hidden: {opacity: 0, y: 12},
    show: {opacity: 1, y: 0, transition: {duration: 0.4, ease: "easeOut" as const}}
};

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
        return <p className="text-slate-400 dark:text-slate-500">Failed to load dashboard data.</p>;
    }

    return (
        <div className="space-y-8">
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
                <motion.div variants={fadeUp}>
                    <StatCard
                        title="Orders Today"
                        value={data.totalOrdersToday}
                        icon={<ShoppingCart className="size-5"/>}
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        title="Pending"
                        value={data.ordersByStatus.pending}
                        icon={<Clock className="size-5"/>}
                        iconClassName="bg-amber-50 dark:bg-amber-950/30 text-amber-500"
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        title="Delivered"
                        value={data.ordersByStatus.delivered}
                        icon={<CheckCircle className="size-5"/>}
                        iconClassName="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500"
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        title="Low Stock"
                        value={data.lowStockItemsCount}
                        icon={<AlertTriangle className="size-5"/>}
                        iconClassName="bg-red-50 dark:bg-red-950/30 text-red-500"
                    />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <StatCard
                        title="Revenue Today"
                        value={formatCurrency(data.revenueToday)}
                        icon={<DollarSign className="size-5"/>}
                        iconClassName="bg-violet-50 dark:bg-violet-950/30 text-violet-500"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, delay: 0.4}}
            >
                <AnalyticsCharts/>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, delay: 0.5}}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
            >
                <ProductSummary products={data.productSummary || []}/>
                <ActivityFeed activities={data.recentActivity || []}/>
            </motion.div>
        </div>
    );
}

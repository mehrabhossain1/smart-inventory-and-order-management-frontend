"use client";

import {useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {Skeleton} from "@/components/ui/skeleton";
import {formatCurrency} from "@/helpers";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar, ReferenceLine,
} from "recharts";

interface AnalyticsData {
    revenueByDay: { date: string; revenue: number; orders: number }[];
    ordersByStatus: { status: string; count: number }[];
    topProducts: { name: string; totalSold: number; totalRevenue: number }[];
    stockOverview: { name: string; quantity: number; threshold: number; status: string }[];
}

const STATUS_COLORS: Record<string, string> = {
    Pending: "#f59e0b",
    Confirmed: "#3b82f6",
    Shipped: "#8b5cf6",
    Delivered: "#10b981",
    Cancelled: "#ef4444",
};

export function AnalyticsCharts() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get<{ analytics: AnalyticsData }>(API_ENDPOINTS.dashboard.analytics)
            .then((res) => setData(res.analytics))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({length: 4}).map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-2xl"/>
                ))}
            </div>
        );
    }

    if (!data) return null;

    const formatDay = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {weekday: "short"});
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">Revenue Trend (7 Days)</h3>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={data.revenueByDay}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="date" tickFormatter={formatDay} tick={{fontSize: 12, fill: "#94a3b8"}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 12, fill: "#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                        <Tooltip
                            contentStyle={{background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13}}
                            formatter={(value) => [formatCurrency(Number(value)), "Revenue"] as const}
                            labelFormatter={(label) => formatDay(String(label))}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#8000ff" strokeWidth={2.5} dot={{fill: "#8000ff", r: 4}} activeDot={{r: 6, fill: "#8000ff"}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Orders by Status */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">Orders by Status</h3>
                <div className="flex items-center gap-6">
                    <ResponsiveContainer width="50%" height={240}>
                        <PieChart>
                            <Pie
                                data={data.ordersByStatus.filter(s => s.count > 0)}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="count"
                            >
                                {data.ordersByStatus.filter(s => s.count > 0).map((entry) => (
                                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || "#94a3b8"} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13}}
                                formatter={(value, name) => [String(value), String(name)] as const}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1 space-y-2.5">
                        {data.ordersByStatus.map((s) => (
                            <div key={s.status} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full" style={{background: STATUS_COLORS[s.status]}} />
                                    <span className="text-slate-600 dark:text-slate-400">{s.status}</span>
                                </div>
                                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{s.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">Top Selling Products</h3>
                {data.topProducts.length === 0 ? (
                    <p className="text-sm text-slate-400">No sales data yet.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={data.topProducts} layout="vertical" margin={{left: 10}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                            <XAxis type="number" tick={{fontSize: 12, fill: "#94a3b8"}} axisLine={false} tickLine={false} />
                            <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: "#94a3b8"}} axisLine={false} tickLine={false} width={100} />
                            <Tooltip
                                contentStyle={{background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13}}
                                formatter={(value) => [String(value), "Units Sold"] as const}
                            />
                            <Bar dataKey="totalSold" fill="#8000ff" radius={[0, 6, 6, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Stock Level Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">Stock Levels</h3>
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data.stockOverview} margin={{bottom: 40}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: "#94a3b8", angle: -35, textAnchor: "end"}} axisLine={false} tickLine={false} interval={0} height={60} />
                        <YAxis tick={{fontSize: 12, fill: "#94a3b8"}} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 13}}
                        />
                        <Bar dataKey="quantity" name="Stock" radius={[6, 6, 0, 0]} barSize={24}>
                            {data.stockOverview.map((entry, i) => (
                                <Cell key={i} fill={entry.quantity === 0 ? "#ef4444" : entry.quantity <= entry.threshold ? "#f59e0b" : "#10b981"} />
                            ))}
                        </Bar>
                        <ReferenceLine y={0} stroke="var(--border)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

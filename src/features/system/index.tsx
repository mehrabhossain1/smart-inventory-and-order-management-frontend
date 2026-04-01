"use client";

import {useEffect, useState, useCallback} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {
    Server, Database, Wifi, Activity, Clock, Cpu, HardDrive, Zap, RefreshCw,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuthStore} from "@/store/auth-store";

interface SystemHealth {
    system: {
        status: string;
        uptime: string;
        nodeVersion: string;
        platform: string;
        memory: { used: string; total: string; percentage: number; heapUsed: string; heapTotal: string };
        cpu: { user: string; system: string; cores: number };
    };
    database: {
        status: string;
        name?: string;
        collections?: number;
        documents?: Record<string, number>;
    };
    websocket: { activeConnections: number; totalRooms: number };
    api: {
        totalRequests: number;
        totalErrors: number;
        avgResponseTime: string;
        p95ResponseTime: string;
        errorRate: string;
        requestsPerMinute: number;
    };
}

function MetricCard({icon, label, value, sub, className}: {
    icon: React.ReactNode; label: string; value: string | number; sub?: string; className?: string;
}) {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 shadow-sm ${className || ""}`}>
            <div className="flex items-center gap-3 mb-3">
                <div className="size-9 rounded-xl bg-primary-light/10 flex items-center justify-center text-primary-light">
                    {icon}
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{value}</p>
            {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
        </div>
    );
}

export default function SystemPage() {
    const [data, setData] = useState<SystemHealth | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
    const {user} = useAuthStore();

    const fetchHealth = useCallback(async () => {
        try {
            const res = await apiClient.get<SystemHealth>(API_ENDPOINTS.system.health);
            setData(res);
            setLastRefresh(new Date());
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHealth();
        const interval = setInterval(fetchHealth, 10000);
        return () => clearInterval(interval);
    }, [fetchHealth]);

    if (user?.role !== "admin") {
        return (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <Server className="size-12 mx-auto mb-3 opacity-30"/>
                <p className="text-lg font-medium">Admin Access Required</p>
                <p className="text-sm mt-1">System health monitoring is available to administrators only.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({length: 8}).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl"/>)}
                </div>
            </div>
        );
    }

    if (!data) {
        return <p className="text-slate-400">Failed to load system health data.</p>;
    }

    const statusColor = data.system.status === "healthy"
        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-200/60"
        : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-200/60";

    const dbStatusColor = data.database.status === "connected"
        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-200/60"
        : "bg-red-50 dark:bg-red-950/30 text-red-600 border-red-200/60";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`${statusColor} rounded-full px-3 py-1 text-xs font-medium`}>
                        {data.system.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                        Last updated: {lastRefresh.toLocaleTimeString()} (auto-refresh 10s)
                    </span>
                </div>
                <Button variant="outline" size="sm" onClick={fetchHealth} className="rounded-xl">
                    <RefreshCw className="size-3.5 mr-1.5"/>
                    Refresh
                </Button>
            </div>

            {/* System Overview */}
            <div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">System</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard icon={<Clock className="size-4"/>} label="Uptime" value={data.system.uptime} sub={`${data.system.nodeVersion} / ${data.system.platform}`}/>
                    <MetricCard icon={<HardDrive className="size-4"/>} label="Memory" value={data.system.memory.used} sub={`${data.system.memory.percentage}% of ${data.system.memory.total}`}/>
                    <MetricCard icon={<Cpu className="size-4"/>} label="CPU Cores" value={data.system.cpu.cores} sub={`User: ${data.system.cpu.user} / Sys: ${data.system.cpu.system}`}/>
                    <MetricCard icon={<HardDrive className="size-4"/>} label="Heap" value={data.system.memory.heapUsed} sub={`of ${data.system.memory.heapTotal} allocated`}/>
                </div>
            </div>

            {/* API Performance */}
            <div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">API Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard icon={<Activity className="size-4"/>} label="Total Requests" value={data.api.totalRequests.toLocaleString()} sub={`${data.api.requestsPerMinute} req/min`}/>
                    <MetricCard icon={<Zap className="size-4"/>} label="Avg Response" value={data.api.avgResponseTime} sub={`p95: ${data.api.p95ResponseTime}`}/>
                    <MetricCard icon={<Activity className="size-4"/>} label="Error Rate" value={data.api.errorRate} sub={`${data.api.totalErrors} total errors`}/>
                    <MetricCard icon={<Wifi className="size-4"/>} label="WebSocket" value={`${data.websocket.activeConnections} connected`} sub={`${data.websocket.totalRooms} rooms active`}/>
                </div>
            </div>

            {/* Database */}
            <div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Database</h3>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="size-5 text-primary-light"/>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{data.database.name || "MongoDB"}</span>
                        <Badge variant="outline" className={`${dbStatusColor} rounded-full px-2.5 text-[11px] font-medium`}>
                            {data.database.status}
                        </Badge>
                        {data.database.collections && (
                            <span className="text-xs text-slate-400">{data.database.collections} collections</span>
                        )}
                    </div>
                    {data.database.documents && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {Object.entries(data.database.documents)
                                .sort(([, a], [, b]) => b - a)
                                .map(([collection, count]) => (
                                    <div key={collection} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{collection}</p>
                                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200 tabular-nums">{count}</p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

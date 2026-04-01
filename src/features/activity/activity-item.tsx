"use client";

import type {ActivityLog} from "@/shared/types";
import {formatRelativeTime, formatActionLabel, formatDateTime} from "@/helpers";
import {
    ShoppingCart, Package, AlertTriangle, RefreshCw, Trash2, CheckCircle, XCircle, Edit,
} from "lucide-react";

const actionIcons: Record<string, React.ElementType> = {
    ORDER_CREATED: ShoppingCart,
    ORDER_STATUS_CHANGED: Edit,
    ORDER_CANCELLED: XCircle,
    STOCK_UPDATED: RefreshCw,
    PRODUCT_ADDED_TO_RESTOCK: AlertTriangle,
    PRODUCT_RESTOCKED: CheckCircle,
    PRODUCT_CREATED: Package,
    PRODUCT_DELETED: Trash2,
};

const actionColors: Record<string, string> = {
    ORDER_CREATED: "bg-blue-50 text-blue-500",
    ORDER_STATUS_CHANGED: "bg-violet-50 text-violet-500",
    ORDER_CANCELLED: "bg-red-50 text-red-500",
    STOCK_UPDATED: "bg-emerald-50 text-emerald-500",
    PRODUCT_ADDED_TO_RESTOCK: "bg-amber-50 text-amber-500",
    PRODUCT_RESTOCKED: "bg-emerald-50 text-emerald-500",
    PRODUCT_CREATED: "bg-primary-light/10 text-primary-light",
    PRODUCT_DELETED: "bg-red-50 text-red-500",
};

interface ActivityItemProps {
    activity: ActivityLog;
}

export function ActivityItem({activity}: ActivityItemProps) {
    const Icon = actionIcons[activity.action] || Package;
    const colorClass = actionColors[activity.action] || "bg-slate-50 text-slate-400";
    const performer =
        typeof activity.performedBy === "object"
            ? activity.performedBy.username
            : "System";

    return (
        <div className="flex items-start gap-4 py-4 px-4 -mx-4 rounded-xl hover:bg-slate-50/80 transition-colors duration-200">
            <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon className="size-4"/>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                    <span className="font-medium text-slate-800">{formatActionLabel(activity.action)}</span>
                    {activity.details && (
                        <span className="text-slate-400"> — {activity.details}</span>
                    )}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{performer}</span>
                    <span className="text-xs text-slate-300">&middot;</span>
                    <span className="text-xs text-slate-400" title={formatDateTime(activity.timestamp)}>
                        {formatRelativeTime(activity.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
}

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

interface ActivityItemProps {
    activity: ActivityLog;
}

export function ActivityItem({activity}: ActivityItemProps) {
    const Icon = actionIcons[activity.action] || Package;
    const performer =
        typeof activity.performedBy === "object"
            ? activity.performedBy.username
            : "System";

    return (
        <div className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="size-9 rounded-full bg-primary-light/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="size-4 text-primary-light"/>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                    <span className="font-medium">{formatActionLabel(activity.action)}</span>
                    {activity.details && (
                        <span className="text-gray-500"> — {activity.details}</span>
                    )}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{performer}</span>
                    <span className="text-xs text-gray-300">&middot;</span>
                    <span className="text-xs text-gray-400" title={formatDateTime(activity.timestamp)}>
                        {formatRelativeTime(activity.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
}

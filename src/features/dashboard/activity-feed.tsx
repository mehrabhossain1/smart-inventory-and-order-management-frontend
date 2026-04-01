"use client";

import type {ActivityLog} from "@/shared/types";
import {formatRelativeTime, formatActionLabel} from "@/helpers";

interface ActivityFeedProps {
    activities: ActivityLog[];
}

export function ActivityFeed({activities}: ActivityFeedProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-5">Recent Activity</h3>
            {activities.length === 0 ? (
                <p className="text-sm text-slate-400">No recent activity.</p>
            ) : (
                <div className="space-y-1">
                    {activities.map((activity) => {
                        const performer =
                            typeof activity.performedBy === "object"
                                ? activity.performedBy.username
                                : "System";
                        return (
                            <div
                                key={activity._id}
                                className="flex items-start gap-3 py-3 px-3 -mx-3 rounded-xl hover:bg-slate-50/80 transition-colors duration-200"
                            >
                                <div className="size-2 rounded-full bg-primary-light mt-2 shrink-0 ring-4 ring-primary-light/10"/>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-700">
                                        <span className="font-medium text-slate-800">{formatActionLabel(activity.action)}</span>
                                        {activity.details && (
                                            <span className="text-slate-400"> — {activity.details}</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {performer} &middot; {formatRelativeTime(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

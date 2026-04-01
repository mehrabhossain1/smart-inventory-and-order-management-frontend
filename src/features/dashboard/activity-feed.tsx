"use client";

import type {ActivityLog} from "@/shared/types";
import {formatRelativeTime, formatActionLabel} from "@/helpers";

interface ActivityFeedProps {
    activities: ActivityLog[];
}

export function ActivityFeed({activities}: ActivityFeedProps) {
    return (
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-slate-700/30 p-6 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-tight mb-5 flex items-center gap-2"><span className="size-2 rounded-full bg-primary-light/60" />Recent Activity</h3>
            {activities.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500">No recent activity.</p>
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
                                className="flex items-start gap-3 py-3 px-3 -mx-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors duration-200"
                            >
                                <div className="size-2 rounded-full bg-primary-light mt-2 shrink-0 ring-[3px] ring-primary-light/10 dark:ring-primary-light/20"/>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{formatActionLabel(activity.action)}</span>
                                        {activity.details && (
                                            <span className="text-slate-400 dark:text-slate-500"> — {activity.details}</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
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

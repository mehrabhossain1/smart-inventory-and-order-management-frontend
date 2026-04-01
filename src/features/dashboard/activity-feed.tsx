"use client";

import {Card} from "@/components/ui/card";
import type {ActivityLog} from "@/shared/types";
import {formatRelativeTime, formatActionLabel} from "@/helpers";

interface ActivityFeedProps {
    activities: ActivityLog[];
}

export function ActivityFeed({activities}: ActivityFeedProps) {
    return (
        <Card className="p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
            {activities.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity.</p>
            ) : (
                <div className="space-y-3">
                    {activities.map((activity) => {
                        const performer =
                            typeof activity.performedBy === "object"
                                ? activity.performedBy.username
                                : "System";
                        return (
                            <div
                                key={activity._id}
                                className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                            >
                                <div className="size-2 rounded-full bg-primary-light mt-2 shrink-0"/>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">{formatActionLabel(activity.action)}</span>
                                        {activity.details && (
                                            <span className="text-gray-500"> — {activity.details}</span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {performer} &middot; {formatRelativeTime(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Card>
    );
}

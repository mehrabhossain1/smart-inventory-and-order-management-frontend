"use client";

import type {ActivityLog} from "@/shared/types";
import {ActivityItem} from "./activity-item";
import {Skeleton} from "@/components/ui/skeleton";

interface ActivityListProps {
    activities: ActivityLog[];
    loading: boolean;
}

export function ActivityList({activities, loading}: ActivityListProps) {
    if (loading) {
        return (
            <div className="space-y-3">
                {Array.from({length: 5}).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-xl"/>
                ))}
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-100">
                <p>No activity recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                    <ActivityItem key={activity._id} activity={activity}/>
                ))}
            </div>
        </div>
    );
}

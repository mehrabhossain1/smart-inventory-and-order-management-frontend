"use client";

import {Card} from "@/components/ui/card";
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
                    <Skeleton key={i} className="h-16 rounded-lg"/>
                ))}
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No activity recorded yet.</p>
            </div>
        );
    }

    return (
        <Card className="p-5">
            {activities.map((activity) => (
                <ActivityItem key={activity._id} activity={activity}/>
            ))}
        </Card>
    );
}

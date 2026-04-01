"use client";

import {useEffect, useState} from "react";
import {apiClient} from "@/lib/api-client";
import {API_ENDPOINTS} from "@/config/api-endpoints";
import type {ActivityLog} from "@/shared/types";
import {ActivityList} from "./activity-list";

export default function ActivityPage() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get<{ logs: ActivityLog[] }>(API_ENDPOINTS.activity.recent, {limit: 20})
            .then((data) => setActivities(data.logs || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-500">{activities.length} recent activities</p>
            <ActivityList activities={activities} loading={loading}/>
        </div>
    );
}

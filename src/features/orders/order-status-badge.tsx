"use client";

import {Badge} from "@/components/ui/badge";
import {statusColors} from "@/helpers/constant";

interface OrderStatusBadgeProps {
    status: string;
}

export function OrderStatusBadge({status}: OrderStatusBadgeProps) {
    return (
        <Badge variant="outline" className={statusColors[status] || ""}>
            {status}
        </Badge>
    );
}

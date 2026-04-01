"use client";

import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    className?: string;
    iconClassName?: string;
}

export function StatCard({title, value, icon, className, iconClassName}: StatCardProps) {
    return (
        <Card className={cn("p-5", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div
                    className={cn(
                        "size-12 rounded-xl flex items-center justify-center",
                        iconClassName || "bg-primary-light/10 text-primary-light"
                    )}
                >
                    {icon}
                </div>
            </div>
        </Card>
    );
}

"use client";

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
        <div className={cn(
            "bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300",
            className
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1.5">{value}</p>
                </div>
                <div
                    className={cn(
                        "size-11 rounded-xl flex items-center justify-center",
                        iconClassName || "bg-primary-light/10 text-primary-light"
                    )}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

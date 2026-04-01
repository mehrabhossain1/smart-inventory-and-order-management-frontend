"use client";

import {cn} from "@/lib/utils";
import {motion} from "framer-motion";

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
            "relative overflow-hidden bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-slate-700/30 p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-300",
            className
        )}>
            <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-primary-light/60 via-primary-lighter/40 to-transparent" />
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{title}</p>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1.5 tracking-tight"
                    >
                        {value}
                    </motion.p>
                </div>
                <div
                    className={cn(
                        "size-11 rounded-xl flex items-center justify-center ring-1 ring-inset ring-black/[0.03] dark:ring-white/[0.05] shadow-sm",
                        iconClassName || "bg-primary-light/10 text-primary-light"
                    )}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

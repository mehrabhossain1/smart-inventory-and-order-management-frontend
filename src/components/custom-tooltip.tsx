"use client";

import * as React from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

type CustomTooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delay?: number;
    className?: string;
};

export function CustomTooltip({
                                  children,
                                  content,
                                  side = "top",
                                  align = "center",
                                  delay = 200,
                                  className,
                              }: CustomTooltipProps) {
    return (
        <TooltipProvider delayDuration={delay}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                <TooltipContent
                    side={side}
                    align={align}
                    className={cn(
                        "z-50 rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-md",
                        "animate-in fade-in-0 zoom-in-95",
                        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                        className
                    )}
                >
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

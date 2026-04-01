"use client";

import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

export function JobFilters() {
    const [filters, setFilters] = useState({
        fullTime: true,
        partTime: true,
        internship: false,
        projectWork: true,
        volunteering: false,
        fullDay: true,
        flexibleSchedule: true,
        shiftWork: false,
        distantWork: true,
        shiftMethod: false,
    });

    const handleFilterChange = (key: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev],
        }));
    };

    return (
        <div className="w-64 p-6 relative">

            <span className="absolute top-0 right-0 h-full w-[0.8px] bg-border mask-b-from-white"/>

            <div className="space-y-6">
                <p className="font-semibold text-lg">Filters</p>

                <div>
                    <p className="text-base mt-5 mb-1 font-medium text-accent-foreground">
                        Working schedule
                    </p>
                    <div className="space-y-2 mt-3">
                        {
                            Array.from({length: 7}).map((_, i) => (
                                <div key={i} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={true}
                                    />
                                    <span className="flex-1 cursor-pointer text-sm font-normal text-foreground">Full time</span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <p className="text-base mt-5 mb-1 font-medium text-accent-foreground">
                        Employment type
                    </p>
                    <div className="space-y-2 mt-3">
                        {
                            Array.from({length: 7}).map((_, i) => (
                                <div key={i} className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={true}
                                    />
                                    <span
                                        className="flex-1 cursor-pointer text-sm font-normal text-foreground">Full-Time</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

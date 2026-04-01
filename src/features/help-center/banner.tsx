"use client";

import {Icon} from "@iconify/react";
import {Input} from "@/components/ui/input";
import RootWrapper from "@/shared/root-wrapper";

export function Banner({onSearch}: { onSearch: (v: string) => void }) {
    return (
        <section className="relative overflow-x-clip bg-primary-light/10 rounded-b-[40px] py-24 z-0 sm:py-42">

            <RootWrapper>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl text-primary lg:text-6xl font-bold text-balance leading-tight">
                        Help Center
                    </h1>

                    <p className="text-lg sm:text-xl mt-3 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                        Search answers about DevJobs Network, hiring, verification, and policies.
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <Input
                            placeholder="Search questions, jobs, companies, policies..."
                            className="h-14 rounded-full pl-12 bg-white shadow-none focus-visible:ring-primary-lighter/30 border-border"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <Icon
                            icon="iconamoon:search-light"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground"
                        />
                    </div>
                </div>
            </RootWrapper>
        </section>
    );
}

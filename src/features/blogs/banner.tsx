"use client";

import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import RootWrapper from "@/shared/root-wrapper";

interface BannerProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function Banner({searchQuery, onSearchChange}: BannerProps) {
    return (
        <div
            className="relative overflow-x-clip bg-primary-lighter/10 rounded-b-[40px] py-24 sm:py-42">

            <RootWrapper>
                <h1 className="text-4xl text-center sm:text-5xl mx-auto text-primary w-full lg:text-6xl font-bold max-w-4xl leading-tight">
                    Discover Our Latest{" "}
                    <span
                        className="text-primary-light font-viga">
                            Insights
                        </span>
                </h1>
                <p className="text-lg text-center sm:text-xl mt-2 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                    Expert tips, industry trends, and career advice to help you navigate
                    the tech job market and advance your developer career.
                </p>

                <div className="flex items-center gap-2 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <Icon
                            icon="iconamoon:search-light"
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-muted-foreground w-5 h-5"
                        />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-12 py-6 rounded-lg bg-white shadow-none border-border focus-visible:ring-primary-lighter/30"
                        />
                    </div>
                    <Button className="px-6 py-6 rounded-lg bg-primary-light hover:bg-primary-light/90 text-white">
                        Search
                    </Button>
                </div>
            </RootWrapper>
        </div>
    );
}

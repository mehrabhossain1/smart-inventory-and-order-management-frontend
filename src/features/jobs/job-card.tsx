"use client";

import {Bookmark} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface JobCardProps {
    date: string;
    company: string;
    title: string;
    tags: string[];
    salary: string;
    location: string;
    logo: string;
    backgroundColor: string;
    saved?: boolean;
}

export function JobCard({
                            date,
                            company,
                            title,
                            tags,
                            salary,
                            location,
                            logo,
                            backgroundColor,
                            saved = false,
                        }: JobCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl p-6 relative transition-all hover:shadow-lg",
                backgroundColor,
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-foreground/70">{date}</span>
                <button className="p-1 hover:bg-black/5 rounded transition-colors">
                    <Bookmark
                        className={cn(
                            "size-5",
                            saved
                                ? "fill-current text-foreground"
                                : "text-foreground/70",
                        )}
                    />
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-foreground/80 mb-1">
                    {company}
                </h3>
                <h2 className="text-xl font-semibold text-foreground">
                    {title}
                </h2>
            </div>

            <div
                className="absolute top-6 right-6 size-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                {logo}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-white/50 text-foreground/80"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-black/10">
                <div>
                    <div className="text-lg font-semibold text-foreground">
                        {salary}
                    </div>
                    <div className="text-sm text-foreground/60">{location}</div>
                </div>
                <Button
                    variant='default'
                    className="px-6 !py-5.5 bg-black text-white rounded-full hover:bg-black/90 transition-colors font-medium">
                    Details
                </Button>
            </div>
        </div>
    );
}

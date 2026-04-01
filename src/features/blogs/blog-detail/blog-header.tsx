"use client";

import Link from "next/link";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import type {BlogPost} from "../types";
import {PATHS} from "@/config/paths";

interface BlogHeaderProps {
    post: BlogPost;
}

export function BlogHeader({post}: BlogHeaderProps) {
    const handleShare = (platform: string) => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        const text = post.title;

        const shareUrls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            copy: url,
        };

        if (platform === "copy") {
            navigator.clipboard.writeText(url);
            return;
        }

        window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
    };

    const breadcrumbs = [
        {label: "Home", href: PATHS.home},
        {label: "Blog", href: PATHS.public.blogs},
        {label: post.category},
    ];


    return (
        <header className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <div key={index} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary-light transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-primary-light">{item.label}</span>
                            )}

                            {!isLast && (
                                <Icon
                                    icon="solar:alt-arrow-right-linear"
                                    className="w-3 h-3"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <h1 className="text-4xl text-center sm:text-5xl mx-auto text-primary w-full lg:text-6xl font-bold max-w-4xl leading-tight">
                {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-4 mt-3">
                <div className="flex items-center gap-1.5">
                    <div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-primary-lighter flex items-center justify-center text-white font-semibold">
                        {post.author.name.charAt(0)}
                    </div>
                    <p className="text-sm text-muted-foreground">{post.author.name}</p>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Icon icon="solar:calendar-linear" className="size-5"/>
                        {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Icon icon="solar:clock-circle-linear" className="size-5"/>
                        {post.readTime}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full border-border hover:bg-primary-light/10 hover:border-primary-light bg-transparent"
                    onClick={() => handleShare("twitter")}
                >
                    <Icon icon="ri:twitter-x-fill" className="size-[1.1rem]"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full border-border hover:bg-primary-light/10 hover:border-primary-light bg-transparent"
                    onClick={() => handleShare("linkedin")}
                >
                    <Icon icon="ri:linkedin-fill" className="size-[1.1rem]"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-full border-border hover:bg-primary-light/10 hover:border-primary-light bg-transparent"
                    onClick={() => handleShare("copy")}
                >
                    <Icon icon="solar:copy-linear" className="size-[1.1rem]"/>
                </Button>
            </div>
        </header>
    );
}

"use client";

import Link from "next/link";
import {Icon} from "@iconify/react";
import type {BlogPost} from "./types";

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({post}: BlogCardProps) {

    return (
        <Link href={`/blogs/${post.id}`} className="group block">
            <article
                className="h-full bg-background rounded-2xl border border-border/50 overflow-hidden hover:border-primary-light/30 hover:shadow-lg hover:shadow-primary-light/5 transition-all duration-300">

                <div
                    className="relative h-48 bg-gradient-to-br from-primary-light/10 via-primary-lighter/10 to-secondary/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Icon icon="solar:document-text-bold" className="w-16 h-16 text-primary-light/30"/>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary-light transition-colors mb-2 line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-primary-lighter flex items-center justify-center text-white text-xs font-medium">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="text-sm text-muted-foreground">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Icon icon="solar:clock-circle-linear" className="w-4 h-4"/>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}

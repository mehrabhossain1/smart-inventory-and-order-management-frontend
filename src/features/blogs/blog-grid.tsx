"use client";

import {BlogCard} from "./blog-card";
import type {BlogPost} from "./types";

interface BlogGridProps {
    posts: BlogPost[];
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function BlogGrid({posts, categories, selectedCategory, onCategoryChange}: BlogGridProps) {
    return (
        <div className="pt-16">
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post}/>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-muted/30 rounded-2xl">
                    <p className="text-muted-foreground">No articles found.</p>
                </div>
            )}
        </div>
    );
}

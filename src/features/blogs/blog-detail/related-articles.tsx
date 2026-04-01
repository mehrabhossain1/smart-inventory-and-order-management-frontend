"use client";

import Link from "next/link";
import type {BlogPost} from "../types";
import {BlogCard} from "@/features/blogs/blog-card";

interface RelatedArticlesProps {
    posts: BlogPost[];
}

export function RelatedArticles({posts}: RelatedArticlesProps) {
    if (posts.length === 0) return null;

    return (
        <section className="mt-16 py-16">
            <h2 className="text-3xl mt-6 mb-1 sm:text-4xl font-bold text-center">
                Related Articles
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto text-center">
                Explore more insights and articles related to this topic.
            </p>

            <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blogs/${post.id}`} className="group">
                        <BlogCard post={post}/>
                    </Link>
                ))}
            </div>
        </section>
    );
}

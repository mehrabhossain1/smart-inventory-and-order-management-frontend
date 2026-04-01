"use client";

import {useMemo, useState} from "react";
import {Banner} from "./banner";
import {BlogGrid} from "./blog-grid";
import {blogPosts, getCategories, getFeaturedPosts, getLatestPosts} from "./data";
import RootWrapper from "@/shared/root-wrapper";
import {Impact} from "@/components/impact";

export type {Author, BlogPost} from "./types";
export {blogPosts, getBlogPost, getRelatedPosts} from "./data";

// Main Component
export default function Blogs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => getCategories(), []);
    const featuredPosts = useMemo(() => getFeaturedPosts(3), []);
    const latestPosts = useMemo(() => getLatestPosts(3), []);

    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesSearch =
                searchQuery === "" ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen w-full">
            <Banner searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
            <RootWrapper>
                <BlogGrid
                    posts={filteredPosts}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </RootWrapper>
            <Impact className='mt-72'/>
        </div>
    );
}

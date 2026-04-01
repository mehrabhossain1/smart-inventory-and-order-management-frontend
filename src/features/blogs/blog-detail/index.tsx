"use client";

import {BlogHeader} from "./blog-header";
import {BlogContent} from "./blog-content";
import {RelatedArticles} from "./related-articles";
import {type BlogPost, blogPosts, getRelatedPosts} from "../index";
import {Impact} from "@/components/impact";
import RootWrapper from "@/shared/root-wrapper";

interface BlogDetailProps {
    post: BlogPost;
}

export default function BlogDetail({post}: BlogDetailProps) {
    const relatedPosts = getRelatedPosts(post, 3);
    const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : undefined;

    return (
        <div className="min-h-screen w-full pt-40 relative overflow-clip">

            <div className='bg-primary-lighter size-[400px] blur-[250px] rounded-full absolute top-0 left-0'/>

            <RootWrapper>
                <BlogHeader post={post}/>
                <BlogContent post={post} prevPost={prevPost} nextPost={nextPost}/>
                <RelatedArticles posts={relatedPosts}/>
            </RootWrapper>
            <Impact className='mt-52'/>
        </div>
    );
}

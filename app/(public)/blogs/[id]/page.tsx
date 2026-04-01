import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/features/blogs/blog-detail";
import { getBlogPost, blogPosts } from "@/features/blogs/data";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const post = getBlogPost(id);

    if (!post) {
        return {
            title: "Post Not Found | DevJobs Network",
        };
    }

    return {
        title: `${post.title} | DevJobs Network`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            authors: [post.author.name],
            publishedTime: post.publishedAt,
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params;
    const post = getBlogPost(id);

    if (!post) {
        notFound();
    }

    return <BlogDetail post={post} />;
}

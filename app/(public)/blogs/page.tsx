import type { Metadata } from "next";
import BlogsPage from "@/features/blogs";

export const metadata: Metadata = {
  title: "Tech Career Insights & Guides | DevJobs Network Blog",
  description:
    "Explore expert articles, career advice, and industry trends for developers. Learn about resume building, interview tips, salary negotiations, and emerging technologies.",
  keywords: [
    "tech career blog",
    "developer career advice",
    "programming tutorials",
    "software engineering tips",
    "tech industry trends",
    "interview preparation guide",
    "developer resume tips",
    "coding best practices",
    "tech skills development",
    "career growth for developers",
  ],
  openGraph: {
    title: "Tech Career Insights & Guides | DevJobs Network Blog",
    description:
      "Expert articles and resources to advance your developer career and stay updated with industry trends.",
    url: "https://devjobs-network.com/blog",
    siteName: "DevJobs Network",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Career Insights & Guides | DevJobs Network Blog",
    description:
      "Career advice, technical guides, and industry insights for software developers and tech professionals.",
  },
};

export default function Page() {
  return <BlogsPage />;
}

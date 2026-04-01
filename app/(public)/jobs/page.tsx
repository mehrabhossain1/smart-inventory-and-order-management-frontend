import type { Metadata } from "next";
import Jobs from "@/features/jobs";

export const metadata: Metadata = {
    title: "Browse Tech Jobs | DevJobs Network - Find Your Next Developer Role",
    description:
        "Explore thousands of verified tech jobs worldwide. Filter by role, location, experience level, and salary. Find remote developer jobs, frontend, backend, and full-stack positions.",
    keywords: [
        "tech jobs",
        "developer jobs",
        "software engineer jobs",
        "remote developer jobs",
        "frontend jobs",
        "backend jobs",
        "full stack jobs",
        "UI/UX designer jobs",
        "programming jobs",
        "web developer jobs",
    ],
    openGraph: {
        title: "Browse Tech Jobs | DevJobs Network",
        description:
            "Discover high-quality tech job opportunities from trusted companies worldwide.",
        url: "https://devjobs-network.com/jobs",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Browse Tech Jobs | DevJobs Network",
        description:
            "Find your next developer role from thousands of verified tech job listings.",
    },
};

export default function JobsPage() {
    return <Jobs />;
}

import type { Metadata } from "next";
import Landing from "@/features/landing";

export const metadata: Metadata = {
    title: "DevJobs Network | Find Your Dream Developer Job",
    description:
        "DevJobs Network connects talented developers with top tech companies. Browse verified job opportunities, showcase your skills, and accelerate your career growth.",
    keywords: [
        "developer jobs",
        "tech jobs",
        "software engineering jobs",
        "remote developer jobs",
        "frontend jobs",
        "backend jobs",
        "full stack jobs",
        "DevJobs Network",
    ],
    openGraph: {
        title: "DevJobs Network | Find Your Dream Developer Job",
        description:
            "Connect with top tech companies and discover opportunities that match your skills.",
        url: "https://devjobs-network.com",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DevJobs Network | Find Your Dream Developer Job",
        description:
            "Connect with top tech companies and discover opportunities that match your skills.",
    },
};

export default function Home() {
    return <Landing />;
}

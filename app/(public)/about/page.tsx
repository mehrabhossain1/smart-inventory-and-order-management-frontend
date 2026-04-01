import type {Metadata} from "next";
import AboutUs from "@/features/about-us";

export const metadata: Metadata = {
    title: "About DevJobs Network | Developer-Focused Tech Job Platform",
    description:
        "DevJobs Network is a developer-first job platform connecting software engineers with trusted tech companies and high-quality job opportunities worldwide.",
    keywords: [
        "DevJobs Network",
        "developer jobs",
        "tech jobs",
        "remote developer jobs",
        "software engineering careers",
        "frontend jobs",
        "backend jobs",
        "full stack jobs",
    ],
    openGraph: {
        title: "About DevJobs Network",
        description:
            "A developer-first job platform helping engineers find meaningful tech careers.",
        url: "https://devjobs-network.com/about-us",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About DevJobs Network",
        description:
            "Connecting developers with high-quality tech job opportunities worldwide.",
    },
};

export default function AboutPage() {
    return <AboutUs/>;
}

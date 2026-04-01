import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
    title: "Log In | DevJobs Network",
    description:
        "Log in to your DevJobs Network account to access your profile, saved jobs, and applications.",
    keywords: [
        "login DevJobs",
        "developer login",
        "tech jobs login",
        "sign in DevJobs Network",
    ],
    openGraph: {
        title: "Log In | DevJobs Network",
        description:
            "Access your DevJobs Network account and continue your job search.",
        url: "https://devjobs-network.com/login",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Log In | DevJobs Network",
        description: "Access your account and find your next opportunity.",
    },
};

export default function LoginPage() {
    return <LoginForm />;
}

import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
    title: "Create an Account | DevJobs Network",
    description:
        "Join DevJobs Network and connect with top tech companies. Create your developer profile and find your next career opportunity.",
    keywords: [
        "register developer account",
        "sign up DevJobs",
        "create tech profile",
        "developer registration",
        "tech job signup",
    ],
    openGraph: {
        title: "Create an Account | DevJobs Network",
        description:
            "Join thousands of developers finding their dream jobs on DevJobs Network.",
        url: "https://devjobs-network.com/register",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Create an Account | DevJobs Network",
        description:
            "Join the developer community and find your next opportunity.",
    },
};

export default function RegisterPage() {
    return <RegisterForm />;
}

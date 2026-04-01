import type {Metadata} from "next";
import PrivacyPolicy from "@/features/privacy-policy/index";

export const metadata: Metadata = {
    title: "Privacy Policy | DevJobs Network",
    description:
        "Read DevJobs Network’s Privacy Policy to understand how we collect, use, protect, and manage your data while connecting tech talents with verified job opportunities.",
    keywords: [
        "DevJobs Network privacy policy",
        "DevJobs Network data protection",
        "tech job platform privacy",
        "developer privacy policy",
        "job platform data security",
        "talent marketplace privacy",
    ],
    openGraph: {
        title: "Privacy Policy | DevJobs Network",
        description:
            "Learn how DevJobs Network protects your data and ensures transparency across our tech hiring platform.",
        url: "https://devjobs-network.com/privacy-policy",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy | DevJobs Network",
        description:
            "Understand how DevJobs Network handles your data with transparency and security.",
    },
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicy/>;
}

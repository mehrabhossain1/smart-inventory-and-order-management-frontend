import type {Metadata} from "next";
import TermsOfService from "@/features/terms/index";

export const metadata: Metadata = {
    title: "Terms of Service | DevJobs Network",
    description:
        "Read the Terms of Service for DevJobs Network. Learn about platform usage rules, user responsibilities, company guidelines, and our commitment to a trusted tech hiring community.",
    keywords: [
        "DevJobs Network terms",
        "terms of service",
        "devjobs terms and conditions",
        "tech job platform rules",
        "developer job platform policy",
        "hiring platform terms",
        "company posting rules",
        "developer community guidelines",
    ],
    openGraph: {
        title: "Terms of Service | DevJobs Network",
        description:
            "Official Terms of Service for DevJobs Network outlining platform rules, user responsibilities, and company obligations.",
        url: "https://devjobs-network.com/terms",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms of Service | DevJobs Network",
        description:
            "Platform rules, responsibilities, and guidelines for users and companies on DevJobs Network.",
    },
};

export default function TermsPage() {
    return <TermsOfService/>;
}

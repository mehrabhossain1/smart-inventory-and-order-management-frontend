import type {Metadata} from "next";
import HelpCenter from "@/features/help-center/index";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Help Center | DevJobs Network",
    description:
        "Find answers to frequently asked questions about DevJobs Network. Learn how to create an account, apply for jobs, verify companies, manage your profile, and navigate the platform safely and effectively.",
    keywords: [
        "DevJobs Network FAQ",
        "help center",
        "developer jobs help",
        "tech talent support",
        "verified job platform",
        "account setup DevJobs",
        "company verification",
        "talent verification",
        "DevJobs community guidelines",
        "support and help",
    ],
    openGraph: {
        title: "Help Center | DevJobs Network",
        description:
            "Get answers to common questions about using DevJobs Network, including accounts, job applications, verification, and community rules.",
        url: "https://devjobs-network.com/help-center",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Help Center | DevJobs Network",
        description:
            "Explore FAQs and find guidance on accounts, profiles, job applications, and trusted hiring on DevJobs Network.",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Who can use DevJobs Network?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "DevJobs Network is designed for professionals with tech skills. Users must provide accurate information about their experience, projects, or skills."
            }
        },
        {
            "@type": "Question",
            "name": "Is DevJobs Network free for developers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it is completely free for tech talents. You can create a public profile, explore jobs, and apply without cost."
            }
        },
        {
            "@type": "Question",
            "name": "How are job postings verified?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We only share verified jobs that include company name, job title, salary, working hours, work type, and role requirements. Misleading or incomplete posts are rejected."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if a user or company violates the rules?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Violations can result in temporary suspension or permanent bans from the platform or Discord community. Companies with consistent bad reviews may be blacklisted and removed."
            }
        },
        {
            "@type": "Question",
            "name": "Does DevJobs Network guarantee employment?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. DevJobs Network connects talents with verified opportunities but does not guarantee job placement."
            }
        },
        {
            "@type": "Question",
            "name": "How is user data protected?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We handle your information securely and transparently according to our Privacy Policy."
            }
        }
    ]
};

export default function TermsPage() {
    return (
        <>
            <HelpCenter/>
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
            />
        </>
    );
}

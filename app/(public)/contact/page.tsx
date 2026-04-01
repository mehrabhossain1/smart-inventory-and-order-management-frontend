import type {Metadata} from "next";
import Contact from "@/features/contact/index";

export const metadata: Metadata = {
    title: "Contact DevJobs Network | Get in Touch with Our Team",
    description:
        "Contact DevJobs Network to connect with our team. Reach out for partnerships, sponsorships, hiring support, or questions about our tech talent platform.",
    keywords: [
        "Contact DevJobs Network",
        "DevJobs Network contact",
        "tech hiring platform contact",
        "developer job platform support",
        "hire tech talent",
        "tech recruitment platform",
        "community sponsorship",
        "partnership with DevJobs Network",
    ],
    openGraph: {
        title: "Contact DevJobs Network",
        description:
            "Get in touch with DevJobs Network for partnerships, sponsorships, hiring inquiries, or platform support.",
        url: "https://devjobs-network.com/contact",
        siteName: "DevJobs Network",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact DevJobs Network",
        description:
            "Reach out to DevJobs Network for partnerships, hiring support, or general inquiries.",
    },
};

export default function ContactPage() {
    return <Contact/>;
}

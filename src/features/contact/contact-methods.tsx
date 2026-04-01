import {Icon} from "@iconify/react";
import RootWrapper from "@/shared/root-wrapper";

const contactPaths = [
    {
        icon: "mdi:account-group-outline",
        title: "Tech Talent",
        description:
            "Looking for your next role or career growth? Explore verified opportunities and join a trusted tech community.",
        email: "talent@devjobsnetwork.com",
        action: "Join The Community",
        href: "#login",
    },
    {
        icon: "mdi:office-building-outline",
        title: "Hiring Companies",
        description:
            "Hire verified tech talent quickly. Contact us with your role requirements and get matched with qualified candidates ready to join.",
        email: "hiring@devjobsnetwork.com",
        action: "Contact Us",
        href: "#contact-form",
    },
    {
        icon: "mdi:handshake-outline",
        title: "Sponsors & Partners",
        description:
            "Support the tech community and grow your brand through meaningful sponsorship and partnerships.",
        email: "sponsors@devjobsnetwork.com",
        action: "Become a Sponsor",
        href: "#sponsor",
    },
    {
        icon: "mdi:lifebuoy",
        title: "Support & General Inquiries",
        description:
            "Have questions or need help? Our team is here to support you every step of the way.",
        email: "support@devjobsnetwork.com",
        action: "Get Support",
        href: "#faqs",
    },
];

export function ContactMethods() {
    return (
        <section id="contact-methods" className="pb-20 sm:pb-28">
            <RootWrapper>
                <div className="text-center mb-12">
                    <h2 className="text-3xl mt-6 mb-1 sm:text-4xl font-bold">
                        How can we help?
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Reach the right team and get the support you need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactPaths.map((path, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col h-full rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.07)] bg-white p-6 pb-5 transition-all"
                        >
                            <div
                                className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-lighter/20">
                                <Icon icon={path.icon} className="h-6 w-6 text-primary"/>
                            </div>

                            <h3 className="text-lg font-bold mb-1">{path.title}</h3>

                            <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                                {path.description}
                            </p>

                            <div className="border-t pt-2 space-y-3">
                                <a
                                    href={path.href}
                                    className="inline-flex items-center gap-2 transition-all duration-200 hover:bg-primary-lighter/10 p-2 rounded-md text-sm font-semibold text-primary hover:gap-3"
                                >
                                    {path.action}
                                    <Icon icon="mdi:arrow-right" className="h-4 w-4"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </RootWrapper>
        </section>
    );
}

import Link from "next/link";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import RootWrapper from "@/shared/root-wrapper";
import {PATHS} from "@/config/paths";

export function Footer() {
    const footerLinks = {
        resources: [
            {name: "Browse Jobs", href: PATHS.public.jobListing},
            {name: "Find Talents", href: PATHS.public.talentListing},
            // {name: "Post a Job", href: "/post-job"},
            // {name: "Pricing", href: "/pricing"},
        ],
        company: [
            {name: "About Us", href: PATHS.public.about},
            {name: "Be a Sponsor", href: "/sponsorship"},
            {name: "Contract Us", href: PATHS.public.contact},
            {name: "Blogs", href: PATHS.public.blogs},
        ],
        support: [
            {name: "Help Center", href: PATHS.public.helpCenter},
            {name: "Privacy Policy", href: PATHS.public.privacyPolicy},
            {name: "Terms of Service", href: PATHS.public.termsOfService},
        ],
    };

    const socialLinks = [
        {
            icon: "mdi:facebook",
            href: "https://facebook.com",
            label: "Facebook",
        },
        {
            icon: "mdi:linkedin",
            href: "https://linkedin.com",
            label: "LinkedIn",
        },
        {icon: "mdi:twitter", href: "https://twitter.com", label: "Twitter"},
        {icon: "mdi:github", href: "https://github.com", label: "GitHub"},
    ];

    return (
        <footer className="relative overflow-hidden">

            <div
                className="absolute inset-0 z-[-1]"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
                }}
            />

            <RootWrapper className='py-12'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-12 mb-12">

                    <div className="lg:col-span-2">
                        <Link href="/public" className="flex items-center space-x-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/rounded-logo.png"
                                    alt="DevJobs Network"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-viga text-foreground">
                                DevJobs Network
                            </span>
                        </Link>
                        <p className="text-sm mt-3 mb-6 text-muted-foreground max-w-[21.875rem] leading-relaxed">
                            Connecting talented developers with top tech
                            companies. Find your dream job or hire the perfect
                            developer today.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-full bg-muted hover:bg-primary-light flex items-center justify-center duration-300 transition-colors group"
                                >
                                    <Icon
                                        icon={social.icon}
                                        className="text-lg text-muted-foreground group-hover:text-white duration-300 transition-colors"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>


                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-light duration-300 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-light duration-300 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-light duration-300 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className='col-span-2'>
                        <h3 className="font-semibold text-lg text-foreground mb-4">
                            Join Our Newsletter
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Get daily job alerts and curated career insights.
                        </p>
                        <form className="flex relative">
                            <input
                                type="email"
                                required
                                placeholder="example@gmail.com"
                                className="flex-1 px-3 py-4 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-0 focus:ring-primary/20 focus:border-primary-light transition-colors"
                            />
                            <Button
                                type="submit"
                                size="default"
                                className="rounded-lg font-semibold hover:bg-primary-light bg-primary h-[85%] absolute right-1 top-1/2 -translate-y-1/2"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-8 pb-8 border-b border-border/50">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-lighter transition-colors group"
                    >
                        <Icon
                            icon="mdi:facebook"
                            className="text-xl mt-0.5 text-white"
                        />
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                Facebook Community
                            </p>
                            <p className="text-xs text-white/70">
                                1000+ Members
                            </p>
                        </div>
                    </a>
                    <a
                        href="https://discord.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-lighter transition-colors group"
                    >
                        <Icon
                            icon="ic:baseline-discord"
                            className="text-xl text-white mt-0.5"
                        />
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                Discord Community
                            </p>
                            <p className="text-xs text-white/70">
                                2000+ Members
                            </p>
                        </div>
                    </a>

                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 pr-12 pl-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-lighter transition-colors group"
                    >
                        <Icon
                            icon="mdi:linkedin"
                            className="text-xl text-white mt-0.5"
                        />
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">
                                LinkedIn Page
                            </p>
                            <p className="text-xs text-white/70">
                                500+ Members
                            </p>
                        </div>
                    </a>
                </div>

                <p className="text-xs text-center text-white/70 mt-2">
                    © {new Date().getFullYear()} DevJobs Network. All rights
                    reserved.
                </p>
            </RootWrapper>
        </footer>
    );
}

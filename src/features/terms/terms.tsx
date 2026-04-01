import RootWrapper from "@/shared/root-wrapper";

export default function Terms() {
    return (
        <section className="py-20">
            <RootWrapper className="max-w-4xl space-y-10">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Terms of Service</h2>
                    <p className="text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <section>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to DevJobs Network. DevJobs Network is a job-sharing and tech talent hiring network.
                        Here, tech people find jobs of their choice (a complete job post) which we first verify and then
                        share on our network (we share job posts from other places/company pages, we do not do hiring
                        here).
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        DevJobs Network exists to create a transparent, trusted, and community-driven tech
                        hiring ecosystem where talents and companies can connect with confidence and clarity.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Eligibility</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        To use DevJobs Network, you must be a tech professional, learner, or organization involved in
                        the technology industry. By using the platform, you confirm that the information you provide is
                        accurate, complete, and kept up to date.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">User Accounts</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>You are responsible for maintaining the confidentiality of your account</li>
                        <li>You agree not to share login credentials with others</li>
                        <li>You are responsible for all activities that occur under your account</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Use of the Platform</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        DevJobs Network enables users to discover opportunities, connect with tech talent, and build
                        public professional profiles that can be shared as personal portfolios. You agree to use the
                        platform responsibly for lawful, professional, and career-related purposes.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Prohibited Activities</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Providing false or misleading information</li>
                        <li>Spamming, scraping, or abusing platform features</li>
                        <li>Impersonating individuals or organizations</li>
                        <li>Using the platform for unlawful or unethical purposes</li>
                        <li>Violating the privacy or rights of other users</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Content & Profiles</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        You retain ownership of the content you submit, including profiles and listings.
                        However, you grant DevJobs Network permission to display and distribute this content
                        solely for platform functionality and promotion.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Transparency, Moderation & Verification</h3>

                    <p className="text-muted-foreground leading-relaxed">
                        We strive to maintain a trustworthy and transparent ecosystem across DevJobs Network.
                        All content on the platform is actively monitored and moderated to ensure quality,
                        accuracy, and community trust.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                        DevJobs Network only shares verified job postings that meet our minimum quality
                        requirements. Each job listing must include, at a minimum:
                    </p>

                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Company name</li>
                        <li>Position or job title</li>
                        <li>Working hours</li>
                        <li>Salary range or compensation details</li>
                        <li>Remote or onsite work type</li>
                        <li>Clear role responsibilities and basic requirements</li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                        Job posts that do not meet these standards may be rejected or removed. Companies
                        identified as misleading, fraudulent, or repeatedly violating community trust may
                        be restricted or permanently blacklisted, and their job postings will not be shared
                        within the DevJobs Network.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                        In addition, DevJobs Network is committed to verifying tech talents and, where
                        applicable, facilitating trusted introductions between qualified professionals
                        and hiring companies to support reliable and confident hiring decisions.
                    </p>
                </section>


                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Termination & Enforcement</h3>

                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to suspend, restrict, or terminate access to DevJobs Network
                        services if a user or company violates these Terms, misuses the platform, or poses
                        a risk to the community.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                        Enforcement actions may apply to both the DevJobs Network website and our official
                        community channels, including Discord.
                    </p>

                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong className='text-gray-800'>Discord Community:</strong> Sharing promotional, spam, or
                            scam content
                            in any Discord channel may result in a temporary ban of up to <strong
                            className='text-gray-800'>7 days</strong>.
                            Repeated violations may lead to permanent removal from the DevJobs Network
                            Discord server.
                        </li>

                        <li>
                            <strong className='text-gray-800'>Tech Talents:</strong> If we receive credible negative
                            feedback about a
                            tech talent from an authentic and reliable source, we will review and verify
                            the information before taking action.
                        </li>

                        <li>
                            If verified, the talent’s profile may be suspended for up to <strong>7 days</strong>.
                            Repeated or serious violations may result in permanent account termination from
                            the DevJobs Network website.
                        </li>

                        <li>
                            <strong className='text-gray-800'>Companies:</strong> If DevJobs Network
                            receives sufficient
                            authentic reports regarding misleading practices, unhealthy work environments,
                            or violations of community trust, we will investigate and verify such claims.
                        </li>

                        <li>
                            If the reports are confirmed, the company may be permanently blacklisted. In
                            such cases, the company’s job postings will not appear on DevJobs Network or any
                            affiliated community channels, and the company account may be disabled on the
                            DevJobs Network website.
                        </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                        All enforcement actions are carried out with fairness, transparency, and due
                        consideration. DevJobs Network reserves the right to determine appropriate actions
                        based on the severity, frequency, and impact of violations.
                    </p>
                </section>


                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Disclaimer</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        DevJobs Network acts as a platform that connects tech talents with verified
                        opportunities and hiring companies. While we work to maintain a trusted and
                        quality-driven network, we do not guarantee employment, hiring outcomes, or job
                        placement through the platform.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Our role is to facilitate discovery, visibility, and professional connections
                        between job seekers and companies, helping build a more transparent and reliable
                        tech community. Final hiring decisions remain solely between talents and employers.
                    </p>
                </section>


                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Limitation of Liability</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        To the maximum extent permitted by law, DevJobs Network shall not be liable for any
                        indirect, incidental, or consequential damages arising from your use of the platform.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Changes to These Terms</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We may update these Terms of Service from time to time. Continued use of the platform
                        after updates constitutes acceptance of the revised terms.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Your Consent</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing or using DevJobs Network, you agree to be bound by these Terms of Service
                        and all applicable policies.
                    </p>
                </section>

                <section className="space-y-3">
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about these Terms, please contact us at {' '}
                        <a href='mailto:devjobs.networkofficial@gmail.com'
                           className="hover:underline font-medium text-gray-800">devjobs.networkofficial@gmail.com</a>.
                    </p>
                </section>
            </RootWrapper>
        </section>
    );
}

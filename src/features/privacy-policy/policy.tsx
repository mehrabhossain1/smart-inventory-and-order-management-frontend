import RootWrapper from "@/shared/root-wrapper";

export default function Policy() {
    return (
        <section className="py-20">
            <RootWrapper className="max-w-4xl space-y-10">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Privacy Policy</h2>
                    <p className="text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <section className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        DevJobs Network is committed to protecting your privacy and safeguarding your personal
                        information. This Privacy Policy explains how we collect, use, and protect data when you
                        interact with our platform.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Our Mission & Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        <strong className='text-gray-800'>Mission:</strong> To create a transparent and trusted tech
                        hiring ecosystem
                        where professionals can grow their careers and companies can hire with confidence.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        <strong className='text-gray-800'>Vision:</strong> A future where tech careers are built on
                        trust, clarity,
                        and long-term growth through community-driven hiring.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Information We Collect</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Personal details such as name, email, and profile information</li>
                        <li>Skills, experience, and portfolio details provided by tech talents</li>
                        <li>Company and hiring information from recruiters</li>
                        <li>Usage data such as device, browser, and interaction analytics</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">How We Use Your Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>To create and manage user profiles</li>
                        <li>To connect tech talents with verified opportunities</li>
                        <li>To help companies find suitable candidates</li>
                        <li>To improve platform features, security, and performance</li>
                        <li>To communicate important updates and announcements</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Transparency & Data Sharing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We do not sell or trade your personal data. Information is shared only when necessary
                        to enable hiring interactions or when required by law.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Data Security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        We use industry-standard security practices, including encrypted connections and
                        restricted access, to protect your data from unauthorized access.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Your Rights</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Access and update your personal information</li>
                        <li>Request account deletion</li>
                        <li>Control communication preferences</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Community Responsibility</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        As a community-driven platform, we expect all users to provide accurate information
                        and respect privacy, professionalism, and trust across the network.
                    </p>
                </section>

                <section className="space-y-4">
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at
                        <a href='mailto:devjobs.networkofficial@gmail.com'
                           className="hover:underline font-medium text-gray-800"> devjobs.networkofficial@gmail.com</a>.
                    </p>
                </section>
            </RootWrapper>
        </section>
    );
}

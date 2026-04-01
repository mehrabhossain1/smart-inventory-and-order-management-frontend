export function OurMission() {
    return (
        <section id="mission" className="py-20 sm:py-28 bg-fill-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-2 bg-white rounded-full">
                            <span className="text-sm font-semibold text-primary">Our Mission</span>
                        </div>
                        <h2 className="text-3xl text-white sm:text-4xl font-bold leading-tight">
                            Empower Every Developer
                        </h2>
                        <p className="text-lg text-accent leading-relaxed">
                            We believe every developer deserves access to world-class opportunities and a supportive
                            community. Our mission is to remove barriers in the tech hiring process and create a
                            transparent, merit-based platform where talent speaks for itself.
                        </p>
                        <p className="text-lg text-accent leading-relaxed">
                            Through DevJobs Network, we're building more than just a job board—we're creating a
                            movement where developers can showcase their skills, learn from peers, and access
                            opportunities that align with their career aspirations.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="inline-block px-4 py-2 bg-accent/10 rounded-full">
                            <span className="text-sm font-semibold text-accent">Our Vision</span>
                        </div>
                        <h2 className="text-3xl text-white sm:text-4xl font-bold leading-tight">
                            Global Developer Ecosystem
                        </h2>
                        <p className="text-lg text-accent leading-relaxed">
                            We envision a world where geography, background, and circumstance don't limit a
                            developer's potential. Our vision is to build a thriving global ecosystem where
                            developers and companies can connect authentically.
                        </p>
                        <p className="text-lg text-accent leading-relaxed">
                            By 2025, we aim to have empowered 100,000+ developers to find roles that spark
                            innovation and growth, while helping forward-thinking companies discover the best
                            talent from around the world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

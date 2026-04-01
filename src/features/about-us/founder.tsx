export function Founder() {
    return (
        <section id="founder" className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold">
                                    Asfak Ahmed
                                </h2>

                                <p className="text-primary-lighter text-base mt-0.5">
                                    Founder DevJobs Network
                                </p>
                            </div>

                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Mr. Asfak is a passionate advocate for developer empowerment with over 4+ years of
                                    experience in tech. Starting as a front-end developer, Mr. Asfak worked at several
                                    Fortune tech companies and early-stage startups, gaining unique perspectives
                                    on hiring and talent development.
                                </p>

                                <p>
                                    The inspiration for DevJobs Network came from witnessing countless talented
                                    developers struggle to find opportunities that truly aligned with their skills and
                                    aspirations. Mr. Asfak founded DevJobs Network to level the playing field and create
                                    authentic connections between developers and companies.
                                </p>

                                <p className="font-semibold text-foreground">
                                    "Technology should bring people together, not create barriers. Our goal is simple:
                                    help developers find roles where they can thrive and help companies find the talent
                                    they need to build amazing products."
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <a href="#" className="text-primary-light hover:underline font-semibold">
                                    LinkedIn →
                                </a>
                                <a href="#" className="text-primary-light hover:underline font-semibold">
                                    Twitter →
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="relative">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-accent/10 rounded-2xl transform -rotate-3"/>
                            <div
                                className="relative bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-1 overflow-hidden">
                                <img
                                    src='https://i.ibb.co.com/kVb5LgWv/PXL-20251108-102221348-PORTRAIT-1.jpg'
                                    alt='Asfak Ahmed'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

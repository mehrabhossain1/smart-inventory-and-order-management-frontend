import {Icon} from "@iconify/react";

export function Values() {
    const values = [
        {
            title: 'Community First',
            description: 'We build everything with our community in mind. Your success is our success.',
            icon: 'iconoir:group',
        },
        {
            title: 'Transparency',
            description: 'Honest communication and open processes create trust and better outcomes.',
            icon: 'stash:search-duotone',
        },
        {
            title: 'Diversity & Inclusion',
            description: 'We celebrate different backgrounds, perspectives, and experiences.',
            icon: 'tabler:world',
        },
        {
            title: 'Continuous Growth',
            description: 'Learning never stops. We invest in development and skill enhancement.',
            icon: 'streamline:money-graph-arrow-increase-ascend-growth-up-arrow-stats-graph-right-grow',
        },
        {
            title: 'Innovation',
            description: 'We challenge the status quo and embrace creative solutions to problems.',
            icon: 'hugeicons:ai-innovation-03',
        },
        {
            title: 'Impact',
            description: 'Every decision we make is driven by its potential to create positive change.',
            icon: 'tabler:star',
        },
    ];

    return (
        <section className="py-20 bg-fill-background w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl mt-6 mb-1 text-white sm:text-4xl font-bold">
                        The Principles That Guide Us
                    </h2>
                    <p className="text-lg text-card max-w-2xl mx-auto">
                        These values shape every decision we make and every feature we build
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="group hover:bg-white cursor-pointer p-6 pb-26 relative rounded-xl border border-white/20 transition-colors duration-200 space-y-3"
                        >
                            <Icon icon={value.icon}
                                  className='text-[8rem] text-primary opacity-20 absolute -bottom-2 right-2'/>
                            <h3 className="text-xl font-bold transition-colors duration-200 group-hover:text-primary text-white">{value.title}</h3>
                            <p className="text-accent/80 transition-colors duration-200 group-hover:text-accent-foreground leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

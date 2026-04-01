import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import RootWrapper from "@/shared/root-wrapper";
import {TalentProfileCard} from "@/components/talent-profile-card";
import {sampleTalents} from "@/helpers/constant";

export function FeaturedTelants() {
    const skillIcons: { [key: string]: string } = {
        React: "logos:react",
        "Next.js": "logos:nextjs-icon",
        "Node.js": "logos:nodejs-icon",
        TypeScript: "logos:typescript-icon",
        "Vue.js": "logos:vue",
        "Tailwind CSS": "logos:tailwindcss-icon",
        JavaScript: "logos:javascript",
        Python: "logos:python",
        Django: "logos:django-icon",
        PostgreSQL: "logos:postgresql",
        AWS: "logos:aws",
        Docker: "logos:docker-icon",
        Kubernetes: "logos:kubernetes",
        "React Native": "logos:react",
        Flutter: "logos:flutter",
        iOS: "logos:apple",
    };

    return (
        <section className="py-20">
            <RootWrapper>
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Featured Talents
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Meet some of the talented developers actively looking
                        for new opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-fr">
                    {sampleTalents.slice(0, 5).map((dev, index) => (
                        <TalentProfileCard
                            key={index}
                            talent={dev}
                            skillIcons={skillIcons}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        className="rounded-full h-14 !px-8 text-base font-semibold bg-primary-light hover:bg-primary-light/90"
                    >
                        View All Talents
                        <Icon
                            icon="mdi:arrow-right"
                            className="size-[1.35rem]"
                        />
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}

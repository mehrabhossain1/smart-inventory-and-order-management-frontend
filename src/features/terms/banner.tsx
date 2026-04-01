import RootWrapper from "@/shared/root-wrapper";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import {PATHS} from "@/config/paths";

export function Banner() {
    return (
        <section className="relative overflow-x-clip bg-primary-light/10 rounded-b-[40px] py-24 z-0 sm:py-42">
            <RootWrapper>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        Terms of Service for <br/>
                        <span
                            className="bg-gradient-to-r from-primary to-primary-light/70 bg-clip-text text-transparent">
                            DevJobs Network
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl mt-5 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                        These terms outline the rules, responsibilities, and guidelines for using DevJobs
                        Network, ensuring a fair, transparent, and trusted experience for all members of our
                        community.
                    </p>

                    <Button
                        size="lg"
                        href={PATHS.home}
                        className="rounded-full h-14 !px-8 text-base font-medium bg-primary-light hover:bg-primary-light/90"
                    >
                        Explore the Platform
                        <Icon icon="mdi:arrow-right" className="size-[1.4rem]"/>
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}

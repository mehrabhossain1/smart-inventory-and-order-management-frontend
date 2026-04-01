import RootWrapper from "@/shared/root-wrapper";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";

export function Banner() {
    return (
        <section className="relative overflow-clip py-24 z-0 sm:py-42">

            <div
                className='bg-primary-lighter/60 z-[-1] size-[500px] rounded-full right-0 bottom-0 blur-[200px] absolute'/>

            <RootWrapper>
                <div className="text-center">

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                        Building the Future of Tech Careers with{" "}
                        <span
                            className="bg-gradient-to-r from-primary to-primary-light/70 bg-clip-text text-transparent">
                            Trust and Transparency
                        </span>
                    </h1>


                    <p className="text-lg sm:text-xl mt-5 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                        DevJobs Network is a community-driven platform that connects tech talent with trusted
                        opportunities and helps companies hire
                        with confidence. We focus on transparency, quality, and long-term
                        career growth.
                    </p>

                    <Button
                        size="lg"
                        className="rounded-full h-14 !px-8 text-base font-semibold bg-primary-light hover:bg-primary-light/90"
                    >
                        Join as Tech Talent
                        <Icon icon="mdi:arrow-right"
                              className="size-[1.4rem]"/>
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}

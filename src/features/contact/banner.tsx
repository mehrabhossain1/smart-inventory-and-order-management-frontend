import {Icon} from "@iconify/react";
import RootWrapper from "@/shared/root-wrapper";
import {Button} from "@/components/ui/button";

export function Banner() {
    return (
        <section className='relative overflow-x-clip py-24 z-0 sm:py-42'>

            <div
                className='bg-primary-lighter/60 z-[-1] size-[500px] rounded-full right-0 bottom-0 blur-[200px] absolute'/>

            <RootWrapper>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <h1 className="text-4xl sm:text-5xl text-primary lg:text-6xl font-bold text-balance leading-tight">
                        Get in Touch with a{" "}
                        <span
                            className="bg-gradient-to-r from-primary to-primary-light/70 bg-clip-text text-transparent">
                            Trusted Tech Community
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl mt-5 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                        Whether you’re a tech professional exploring opportunities, a company
                        looking to hire verified talent, or a partner interested in supporting
                        the ecosystem, we’re here to help.
                    </p>

                    <Button
                        size='lg'
                        className="rounded-full h-14 !px-8 text-base font-semibold bg-primary-light hover:bg-primary-light/90"
                    >
                        Contact Our Team
                        <Icon icon="mdi:arrow-right" className="size-5.5"/>
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}

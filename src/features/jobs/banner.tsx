import {Button} from "@/components/ui/button"
import RootWrapper from "@/shared/root-wrapper";
import {Icon} from "@iconify/react";
import Image from "next/image";

export default function Banner() {
    return (
        <section className="relative overflow-x-clip bg-primary-lighter/10 rounded-b-[40px] pt-24 sm:pt-42 pb-[20rem]">

            <Image src='/job-finding.png' alt={'looking job illustration'} width={1200} height={1200}
                   className='w-[80%] absolute bottom-0 opacity-60 left-1/2 -translate-x-1/2'/>

            <div
                className='bg-primary-lighter/60 size-[400px] z-10 rounded-full right-0 bottom-0 blur-[200px] absolute'/>

            <RootWrapper className='text-center'>

                <h1 className="text-4xl sm:text-5xl mx-auto w-full text-primary lg:text-6xl font-bold max-w-4xl leading-tight">
                    Find Your Dream{" "}
                    <span className="text-primary-light font-viga">Tech Job</span> Today
                </h1>
                <p className="text-lg sm:text-xl mt-5 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                    Discover thousands of verified tech opportunities
                    from trusted companies worldwide. Filter by role,
                    location, experience level, and salary to find the
                    perfect match for your career.
                </p>
                <Button
                    size="lg"
                    href={'#all-jobs'}
                    className="rounded-full h-14 !px-8 text-base font-medium bg-primary-light hover:bg-primary-light/90"
                >
                    Browse All Jobs
                    <Icon icon="mdi:arrow-right"
                          className="size-[1.4rem]"/>
                </Button>
            </RootWrapper>
        </section>
    )
}

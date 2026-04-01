import {Button} from "@/components/ui/button"
import RootWrapper from "@/shared/root-wrapper";
import {Icon} from "@iconify/react";
import Image from "next/image";

export default function Banner() {
    return (
        <section
            className="relative overflow-x-clip bg-primary-lighter/10 rounded-b-[40px] py-24 sm:py-42">

            <Image src='/male-working.png' alt={'male working'} width={500} height={500}
                   className='w-[410px] absolute -bottom-8 opacity-80 right-12 scale-x-[-1]'/>
            <Image src='/female-working.png' alt={'female working'} width={500} height={500}
                   className='w-[500px] absolute -bottom-10 opacity-60 left-4'/>

            <div
                className='bg-primary-lighter/60 size-[400px] z-10 rounded-full right-0 bottom-0 blur-[200px] absolute'/>

            <RootWrapper className='text-center'>
                <h1 className="text-4xl sm:text-5xl mx-auto text-primary w-full lg:text-6xl font-bold max-w-4xl leading-tight">
                    Find Verified Tech {' '}
                    <span className="text-primary-light font-viga">Tech Talents</span> for Your Team
                </h1>
                <p className="text-lg sm:text-xl mt-5 mb-12 text-accent-foreground max-w-4xl mx-auto leading-relaxed">
                    Hire from a global community of tech experts ready to contribute remotely or on-site, helping you
                    scale your team faster and smarter.
                </p>
                <Button
                    size="lg"
                    href={'#all-talents'}
                    className="rounded-full h-14 !px-8 text-base font-medium bg-primary-light hover:bg-primary-light/90"
                >
                    Browse All Talents
                    <Icon icon="mdi:arrow-right"
                          className="size-[1.4rem]"/>
                </Button>
            </RootWrapper>
        </section>
    )
}

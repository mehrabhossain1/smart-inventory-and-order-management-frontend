import {Icon} from "@iconify/react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {teamMembers} from "@/helpers/constant";
import RootWrapper from "@/shared/root-wrapper";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-36 min-h-[100dvh] grid place-items-center">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
                }}
            />

            <RootWrapper className='relative z-10'>
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance leading-tight">
                        A Secure Network for <a href='#' className='text-primary-light font-viga'>Tech Jobs</a> and <a
                        className='text-primary-light font-viga' href='#'>Talent.</a>
                    </h1>

                    <p className="text-base sm:text-lg mt-2 text-accent-foreground/80 mx-auto text-balance">
                        We connect tech professionals and companies through verified job posts, transparent details,
                        and a trusted community — making hiring and job searching simple, safe, and reliable.
                    </p>

                    <div className="flex flex-col mt-12 mb-8 sm:flex-row gap-4 justify-center pt-4">
                        <Button
                            size="lg"
                            animate={false}
                            className="rounded-full h-14 !pl-8 gap-4 text-base !pr-[0.3rem] font-semibold bg-primary-light hover:bg-primary-light/80"
                        >
                            Explore Verified Jobs
                            <Icon icon="mdi:arrow-right"
                                  className="size-[3rem] text-primary-light bg-white rounded-full p-2.5"/>
                        </Button>
                        <Button
                            variant='outline'
                            size="lg"
                            animate={false}
                            className="rounded-full h-14 shadow-none bg-white hover:bg-white/80 !pl-8 text-base !pr-[0.3rem] font-semibold"
                        >
                            Join as Tech Talent
                            <Icon icon="mdi:arrow-right"
                                  className="size-[3rem] p-3"/>
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <div className="flex">
                            {
                                teamMembers?.map((member, index) => (
                                    <Image key={index} src={member.image} alt={member.name} width={40} height={40}
                                           className='-ml-4 size-10 rounded-full border-2 border-white object-cover'/>
                                ))
                            }
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Icon
                                        key={i}
                                        icon="mdi:star"
                                        className="text-yellow-500 text-sm"
                                    />
                                ))}
                                <span className="text-sm font-semibold ml-1">
                                    5.0
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                Trusted by 200+ tech professionals
                            </span>
                        </div>
                    </div>
                </div>
            </RootWrapper>

            <Image src="/illustration.png" alt="hero-bg" width={1600} height={200}
                   className='w-full absolute -bottom-14 left-0 opacity-10 right-0'/>

        </section>
    );
}

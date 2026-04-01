import Image from "next/image";
import RootWrapper from "@/shared/root-wrapper";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";

export function TalentProfileOverview() {
    return (
        <section className="py-20 bg-fill-background">
            <RootWrapper className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-5">
                    <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Your Public Tech Profile
                        <br/>
                        <span className="text-secondary">
                        Share it anywhere
                        </span>
                    </h2>

                    <p className="text-base text-accent leading-relaxed">
                        When you sign up and complete your profile, DevJobs
                        Network generates a public, shareable profile URL using
                        your username. You can use it as your portfolio website
                        or share it directly with recruiters and companies.
                    </p>

                    <ul className="space-y-3 text-sm text-accent">
                        <li className="flex items-start gap-2">
                            <Icon
                                icon="mdi:check-circle"
                                className=" text-lg mt-0.5"
                            />
                            Public profile with your skills, experience, and links
                        </li>
                        <li className="flex items-start gap-2">
                            <Icon
                                icon="mdi:check-circle"
                                className=" text-lg mt-0.5"
                            />
                            Custom URL like <span
                            className="font-medium text-secondary">https://devjobs-network/username</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Icon
                                icon="mdi:check-circle"
                                className=" text-lg mt-0.5"
                            />
                            Works as a lightweight portfolio website
                        </li>
                    </ul>

                    <div className="pt-6">
                        <Button
                            size="lg"
                            className="rounded-full h-14 !px-8 text-base font-semibold bg-white hover:bg-primary-lighter text-primary hover:text-white transition-colors duration-300"
                        >
                            Create Your Profile
                            <Icon icon="mdi:arrow-right" className="size-[1.35rem]"/>
                        </Button>
                    </div>
                </div>

                <div className="relative group">
                    <div
                        className="relative h-[500px] overflow-hidden rounded-2xl border border-fill-background/80 bg-background">
                        <div
                            className="
                                transition-transform
                                duration-[1400ms]
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:-translate-y-[520px]
                            "
                        >
                            <Image
                                src="https://i.ibb.co.com/W4MfVrSm/image.png"
                                alt="Public talent profile preview"
                                width={800}
                                height={1200}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>

                    <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-fill-background/10 backdrop-blur-2xl text-white border-fill-background border px-4 py-1.5 text-sm shadow-md">
                        🔗 https://devjobs-network/username
                    </div>
                </div>

            </RootWrapper>
        </section>
    );
}

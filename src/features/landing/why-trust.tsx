'use client'

import {Icon} from "@iconify/react";
import RootWrapper from "@/shared/root-wrapper";
import {trustStats} from "@/helpers/constant";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import Image from "next/image";

const DURATION = 3;

export function WhyTrust() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % trustStats.length);
        }, DURATION * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 sm:py-28">
            <RootWrapper>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Why trust{" "}
                            <span className="text-primary-light">
                                DevJobs Network
                            </span>{" "}
                            for better hires?
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            We create a secure, transparent hiring network where
                            companies and tech professionals connect with
                            confidence — no fake listings, no guesswork.
                        </p>

                        <Image src='/icons/handshake-deal.svg' alt='Trust Illustration' width={200} height={200}
                               className='w-[400px] mt-5 object-cover -rotate-[15deg]'
                               style={{
                                   WebkitMaskImage: `
      linear-gradient(
        to right,
        transparent 0%,
        rgba(0,0,0,0.15) 10%,
        black 30%,
        black 70%,
        rgba(0,0,0,0.15) 90%,
        transparent 100%
      )
    `,
                                   maskImage: `
      linear-gradient(
        to right,
        transparent 0%,
        rgba(0,0,0,0.15) 10%,
        black 30%,
        black 70%,
        rgba(0,0,0,0.15) 90%,
        transparent 100%
      )
    `,
                               }}/>
                    </div>

                    <div className="space-y-4">
                        {trustStats.map((stat, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <motion.div
                                    key={index}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className={`relative overflow-hidden p-6 rounded-xl ${
                                        isActive
                                            ? "bg-gradient-to-r from-primary to-primary-lighter border-primary-lighter text-white shadow-xl"
                                            : "border border-border"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            key={activeIndex}
                                            initial={{scaleY: 0}}
                                            animate={{scaleY: 1}}
                                            transition={{
                                                duration: DURATION,
                                                ease: "linear",
                                            }}
                                            className="absolute left-0 top-0 h-full w-1 bg-primary-lighter origin-top"
                                        />
                                    )}

                                    <div className="flex items-start gap-4 relative z-10">
                                        <div
                                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                                isActive
                                                    ? "bg-white/20"
                                                    : "bg-foreground"
                                            }`}
                                        >
                                            <Icon
                                                icon={stat.icon}
                                                className={`text-2xl ${
                                                    isActive
                                                        ? "text-white"
                                                        : "text-background"
                                                }`}
                                            />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <h3 className="text-2xl font-bold">
                                                {stat.title}
                                            </h3>
                                            <p className="font-semibold">
                                                {stat.subtitle}
                                            </p>
                                            <p
                                                className={`text-sm ${
                                                    isActive
                                                        ? "text-white/80"
                                                        : "text-muted-foreground"
                                                }`}
                                            >
                                                {stat.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </RootWrapper>
        </section>
    );
}

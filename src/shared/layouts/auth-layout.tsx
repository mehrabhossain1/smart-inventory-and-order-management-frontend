"use client";

import {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {AuthSlide} from "@/shared/types";

type AuthLayoutProps = {
    children: ReactNode;
    slides: AuthSlide[];
};

export function AuthLayout({children, slides}: AuthLayoutProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div
            className="min-h-screen flex"
            style={{
                background:
                    "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
            }}
        >
            <div className="hidden lg:flex lg:w-1/2 p-4">
                <div
                    className="w-full h-full bg-gradient-to-br from-primary-light/20 via-fill-background/30 to-primary rounded-3xl flex items-end justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                    index === currentSlide
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
                            >
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-6 left-6 z-20">
                        <Link href="/" className="flex items-center space-x-2">
                            <div
                                className='relative transition-all duration-500 ease-in-out size-8'
                            >
                                <Image
                                    src="/rounded-logo.png"
                                    alt="DevJobs Network"
                                    fill
                                    className={'object-contain'}
                                    priority
                                />
                            </div>
                            <span className="text-xl font-viga text-foreground hidden sm:inline">
                            DevJobs Network
                        </span>
                        </Link>
                    </div>

                    <div className="relative z-10 w-full p-6 lg:p-8 pb-8 lg:pb-10 flex flex-col items-center">
                        <div className="text-center max-w-lg">
                            <h2 className="text-3xl mt-6 mb-1 sm:text-4xl font-bold text-accent">
                                {slides[currentSlide].title}
                            </h2>
                            <p className="text-[1rem] text-accent/70 max-w-2xl mx-auto">
                                {slides[currentSlide].subtitle}
                            </p>
                        </div>

                        <div className="flex gap-2 mt-4 lg:mt-6">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? "w-8 bg-white"
                                            : "w-8 bg-white/30 hover:bg-white/50"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-8">
                <div className="w-full max-w-lg">{children}</div>
            </div>
        </div>
    );
}

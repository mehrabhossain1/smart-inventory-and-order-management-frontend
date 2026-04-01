"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import {navLinks} from "@/helpers/constant";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();

    const isTalentDetailPage = /^\/talents\/\d+/.test(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <nav
            className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out', isScrolled
                ? " top-4"
                : "top-0")}
        >
            <div
                className={cn('transition-all duration-300 ease-in-out rounded-full', isScrolled ? isTalentDetailPage ? "max-w-6xl mx-auto bg-primary/50 backdrop-blur-sm py-2 shadow-[0px_2px_20px_0px_rgb(0,0,0,0.1)] px-5 rounded-full" : "max-w-6xl mx-auto bg-background/20 backdrop-blur-xl py-2 shadow-[0px_2px_20px_0px_rgb(0,0,0,0.1)] px-5 rounded-full" : "bg-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2")}
            >
                <div
                    className={cn('flex items-center justify-between transition-all duration-300 ease-in-out', isScrolled ? "h-14" : "h-20")}
                >
                    <Link href="/" className="flex items-center space-x-2">
                        <div
                            className={cn('relative transition-all duration-500 ease-in-out', isScrolled ? "size-7" : "size-8")}
                        >
                            <Image
                                src="/rounded-logo.png"
                                alt="DevJobs Network"
                                fill
                                className={'object-contain'}
                                priority
                            />
                        </div>
                        <span
                            className={cn('text-xl font-viga hidden sm:inline', isTalentDetailPage ? 'text-accent' : 'text-foreground')}>
                            DevJobs Network
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 font-medium font-roboto transition-all duration-300",
                                        isScrolled ? "text-[0.9375rem]" : "text-base",
                                        isActive
                                            ? "text-primary-light"
                                            : isTalentDetailPage ? "text-accent hover:text-primary-light" : "text-gray-800 hover:text-primary-light"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            href='/login'
                            animate={false}
                            size={isScrolled ? "sm" : "default"}
                            className={cn('hidden sm:inline-flex h-12 !px-5 rounded-full text-base font-medium font-roboto transition-all duration-500', isTalentDetailPage ? "text-accent hover:text-gray-800" : "text-gray-800")}
                        >
                            Login
                        </Button>
                        <Button
                            size={isScrolled ? "sm" : "default"}
                            href='/register'
                            className="rounded-full h-12 !px-5 text-base font-medium bg-primary-light hover:bg-primary-light/90"
                        >
                            Join as Talent
                            <Icon icon="mdi:arrow-right" className="size-[1.2rem]"/>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={`md:hidden transition-all duration-500 ${
                                isScrolled ? "w-9 h-9" : "w-10 h-10"
                            }`}
                        >
                            <Icon icon="mdi:menu" className="text-2xl"/>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
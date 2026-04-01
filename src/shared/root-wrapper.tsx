import React from 'react';
import {cn} from "@/lib/utils";

type RootWrapperProps = {
    className?: string
    children: React.ReactNode
}

export default function RootWrapper({className, children}: RootWrapperProps) {
    return (
        <section className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
            {children}
        </section>
    );
};
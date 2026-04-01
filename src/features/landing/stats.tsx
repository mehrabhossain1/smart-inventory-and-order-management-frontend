import React from "react";
import {Icon} from "@iconify/react";
import {stats} from "@/helpers/constant";
import RootWrapper from "@/shared/root-wrapper";

export default function Stats() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
                }}
            />

            <RootWrapper className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group rounded-lg bg-white/80 backdrop-blur p-6 text-center transition-all"
                    >
                        <div
                            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/10 text-primary-light">
                            <Icon icon={stat.icon} className="text-[1.6rem]"/>
                        </div>
                        <div className="text-3xl font-bold">
                            {stat.value}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </RootWrapper>
        </section>
    );
}

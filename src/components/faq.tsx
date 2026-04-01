"use client";

import {useState} from "react";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import RootWrapper from "@/shared/root-wrapper";
import {cn} from "@/lib/utils";
import {faqs} from "@/helpers/constant";
import {PATHS} from "@/config/paths";

export function FAQ({className}: { className?: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const allfaqs = faqs.slice(0, 6);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const midPoint = Math.ceil(allfaqs.length / 2);
    const firstHalf = allfaqs.slice(0, midPoint);
    const secondHalf = allfaqs.slice(midPoint);

    const renderFAQ = (faq: typeof allfaqs[0], index: number) => (
        <div
            key={index}
            className={`border rounded-xl transition-all duration-300 ${
                openIndex === index
                    ? "border-primary-light/50"
                    : "border-border hover:border-primary-light/50"
            }`}
        >
            <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
                    openIndex === index ? "" : "group"
                }`}
            >
                <span className={`font-semibold text-lg pr-4 transition-colors ${
                    openIndex === index
                        ? "text-primary"
                        : "group-hover:text-primary"
                }`}>
                    {faq.question}
                </span>

                <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        openIndex === index
                            ? "bg-primary-light/20"
                            : "bg-primary/10 group-hover:bg-primary-light/20"
                    }`}>
                    <Icon
                        icon="mdi:chevron-down"
                        className={`text-2xl text-primary transition-transform duration-300 ${
                            openIndex === index ? "rotate-180" : ""
                        }`}
                    />
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-48" : "max-h-0"
                }`}
            >
                <div className="px-5 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                </div>
            </div>
        </div>
    );

    return (
        <section className={cn('pt-20 pb-32', className)}>
            <RootWrapper>
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        FAQs
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Find answers to common questions about DevJobs Network
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                        {firstHalf.map((faq, index) => renderFAQ(faq, index))}
                    </div>
                    <div className="flex flex-col gap-6">
                        {secondHalf.map((faq, index) => renderFAQ(faq, index + midPoint))}
                    </div>
                </div>


                <div className="mt-12 text-center space-y-2">
                    <p className="text-muted-foreground">
                        Still have questions?
                    </p>
                    <Button
                        size="lg"
                        href={PATHS.public.helpCenter}
                        className="rounded-full h-14 !px-8 text-base font-medium bg-primary-light hover:bg-primary-light/90"
                    >
                        Visit Help Center
                        <Icon
                            icon="mdi:help-circle"
                            className="size-[1.35rem]"
                        />
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}
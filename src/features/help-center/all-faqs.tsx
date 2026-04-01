"use client";

import {useMemo, useState} from "react";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import RootWrapper from "@/shared/root-wrapper";
import {cn} from "@/lib/utils";
import {PATHS} from "@/config/paths";
import {faqs} from "@/helpers/constant";

type AllFaqsProps = {
    className?: string;
    searchQuery?: string;
};

export function AllFaqs({className, searchQuery = ""}: AllFaqsProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = useMemo(() => {
        if (!searchQuery) return faqs;

        const query = searchQuery.toLowerCase();
        return faqs.filter((faq) => {
            if (faq.question.toLowerCase().includes(query)) return true;
            if (faq.answer.toLowerCase().includes(query)) return true;
            if (faq.tags.some((tag) => tag.toLowerCase().includes(query))) return true;
            return false;
        });
    }, [searchQuery]);

    const midPoint = Math.ceil(filteredFaqs.length / 2);
    const firstHalf = filteredFaqs.slice(0, midPoint);
    const secondHalf = filteredFaqs.slice(midPoint);

    const renderFAQ = (faq: typeof faqs[0], index: number) => (
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
        <span
            className={`font-semibold text-lg pr-4 transition-colors ${
                openIndex === index ? "text-primary" : "group-hover:text-primary"
            }`}
        >
          {faq.question}
        </span>

                <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        openIndex === index
                            ? "bg-primary-light/20"
                            : "bg-primary/10 group-hover:bg-primary-light/20"
                    }`}
                >
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
        <section className={cn("pt-20 pb-32", className)}>
            <RootWrapper>
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Get quick answers about accounts, jobs, verification, and platform
                        features
                    </p>
                </div>

                {filteredFaqs.length === 0 ? (
                    <div className="text-center text-muted-foreground text-base py-20">
                        No FAQs found for "<span className="font-semibold">{searchQuery}</span>"
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6">
                            {firstHalf.map((faq, index) => renderFAQ(faq, index))}
                        </div>
                        <div className="flex flex-col gap-6">
                            {secondHalf.map((faq, index) => renderFAQ(faq, index + midPoint))}
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center space-y-2">
                    <p className="text-muted-foreground">Still have questions?</p>
                    <Button
                        size="lg"
                        href={PATHS.public.contact}
                        className="rounded-full h-14 !px-8 text-base font-semibold bg-primary-light hover:bg-primary-light/90"
                    >
                        Contact With Us
                        <Icon icon="lucide:mail" className="size-[1.35rem]"/>
                    </Button>
                </div>
            </RootWrapper>
        </section>
    );
}

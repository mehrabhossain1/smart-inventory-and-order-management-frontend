'use client';

import {Impact} from "@/components/impact";
import {AllFaqs} from "@/features/help-center/all-faqs";
import {Banner} from "@/features/help-center/banner";
import {useState} from "react";

export default function Index() {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner onSearch={(value) => setSearchQuery(value)}/>
            <AllFaqs searchQuery={searchQuery}/>
            <Impact/>
        </div>
    );
}

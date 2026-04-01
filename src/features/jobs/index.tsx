"use client";

import {JobSearchHeader} from "./job-search-header";
import Banner from "./banner";
import {Impact} from "@/components/impact";
import FilterAndCards from "@/features/jobs/filter-and-cards";

export default function Jobs() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner/>
            <JobSearchHeader/>
            <FilterAndCards/>
            <Impact className='mt-64'/>
        </div>
    );
}

import React from 'react';
import RootWrapper from "@/shared/root-wrapper";
import {JobFilters} from "@/features/jobs/job-filters";
import {JobsListing} from "@/features/jobs/jobs-listing";

export default function FilterAndCards() {
    return (
        <RootWrapper className='flex'>
            <JobFilters/>
            <JobsListing/>
        </RootWrapper>
    );
};
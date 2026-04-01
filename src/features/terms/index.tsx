'use client';

import {Impact} from "@/components/impact";
import {Banner} from "@/features/terms/banner";
import Terms from "@/features/terms/terms";

export default function Index() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner/>
            <Terms/>
            <Impact className='mt-64'/>
        </div>
    );
}

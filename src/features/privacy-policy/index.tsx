'use client';

import {Impact} from "@/components/impact";
import {Banner} from "@/features/privacy-policy/banner";
import Policy from "@/features/privacy-policy/policy";

export default function Index() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner/>
            <Policy/>
            <Impact className='mt-64'/>
        </div>
    );
}

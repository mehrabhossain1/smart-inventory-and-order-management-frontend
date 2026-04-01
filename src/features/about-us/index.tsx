'use client';

import {OurMission} from "@/features/about-us/our-mission";
import {Founder} from "@/features/about-us/founder";
import {Banner} from "@/features/about-us/banner";
import {Values} from "@/features/about-us/values";
import {Impact} from "@/components/impact";
import {TeamMembers} from "@/features/about-us/team-members";

export default function Index() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner/>
            <OurMission/>
            <Founder/>
            <Values/>
            <TeamMembers/>
            <Impact/>
        </div>
    );
}

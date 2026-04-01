import {Hero} from "@/features/landing/hero";
import {TrustedPartner} from "@/features/landing/trusted-partner";
import {WhyTrust} from "@/features/landing/why-trust";
import {FeaturedTelants} from "@/features/landing/featured-telants";
import {FAQ} from "@/components/faq";
import {Impact} from "@/components/impact";
import Stats from "@/features/landing/stats";
import {TalentProfileOverview} from "@/features/landing/talent-profile-overview";

export default function Landing() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Hero/>
            <Stats/>
            <TrustedPartner/>
            <FeaturedTelants/>
            <WhyTrust/>
            <TalentProfileOverview/>
            <FAQ/>
            <Impact/>
        </div>
    );
}

import Banner from "@/features/talents/banner";
import FilterAndTalents from "@/features/talents/filter-and-talents";
import {Impact} from "@/components/impact";

export default function Index() {
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <Banner/>
            <FilterAndTalents/>
            <Impact className='mt-72'/>
        </div>
    );
}

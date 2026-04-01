import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export function Impact({className}: { className?: string }) {
    return (
        <section id="impact" className={cn('mt-32 mb-18', className)}>
            <div className="max-w-6xl relative mx-auto px-4 sm:px-6 lg:px-8">

                <img src="/icons/feeling-proud_tdos.svg" alt="illustration"
                     className="w-[500px] absolute bottom-0 left-2"/>

                <div
                    className="bg-gradient-to-r from-primary to-primary-lighter rounded-2xl p-8 sm:p-12">
                    <div className="space-y-4 max-w-[50%] ml-auto">
                        <h3 className="text-3xl text-white font-bold">Growing Every Day</h3>
                        <p className="text-accent/90 leading-relaxed">
                            Our community grows stronger each day. New developers joining, new opportunities
                            emerging,
                            and new connections being made. We're building something special.
                        </p>
                        <Button
                            className="px-8 h-12 bg-white text-base text-gray-800 hover:bg-primary-lighter font-semibold hover:text-white mt-6">
                            Join Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

import RootWrapper from "@/shared/root-wrapper";
import {partners} from "@/helpers/constant";

export function TrustedPartner() {
    const logos = [...partners, ...partners];

    return (
        <section className="pb-20 pt-15">
            <RootWrapper>
                <p className="text-sm font-medium mb-12 text-center text-muted-foreground tracking-wide uppercase">
                    Trusted by Tech Companies & Communities
                </p>

                <div
                    className="relative overflow-hidden"
                    style={{
                        maskImage:
                            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                >
                    <div className="flex w-max animate-slide hover:[animation-play-state:paused]">
                        {logos.map((partner, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center px-12"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-5 w-auto opacity-60 grayscale cursor-pointer transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </RootWrapper>
        </section>
    );
}

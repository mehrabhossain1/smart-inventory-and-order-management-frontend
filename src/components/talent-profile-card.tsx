import Image from "next/image";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {PATHS} from "@/config/paths";

export type Talent = {
    id: string;
    name: string;
    role: string;
    bio?: string;
    skills: string[];
    image: string;
    available?: boolean;
    location?: string;
    // coverImage?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
};

type TalentProfileCardProps = {
    talent: Talent;
    skillIcons: Record<string, string>;

};

export function TalentProfileCard({talent, skillIcons}: TalentProfileCardProps) {
    return (
        <div
            className="group relative flex flex-col h-full rounded-lg border-2 border-border/40">

            <div className="relative h-[6.25rem]">

                <div className='absolute -bottom-8 right-2.5 flex gap-2'>
                    <a href='#' className='bg-primary rounded-[4px] p-[0.25rem] text-white'>
                        <Icon icon="akar-icons:linkedin-fill" className='text-sm'/>
                    </a>
                    <a href='#' className='bg-primary rounded-[4px] p-[0.25rem] text-white'>
                        <Icon icon="fluent-emoji-high-contrast:globe-with-meridians" className='text-sm'/>
                    </a>
                </div>

                <img
                    src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1200&auto=format&fit=crop"
                    alt="cover"
                    className="w-full h-full object-cover rounded-t-lg"
                />

                <div className="absolute -bottom-10 left-4 w-24 h-24">
                    <Image
                        src={talent.image}
                        alt={talent.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full bg-white border"
                    />

                    {talent.available && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Image
                                    src={"https://i.ibb.co.com/67NRH37h/badge-logo.png"}
                                    alt="Verified"
                                    width={32}
                                    height={32}
                                    className="absolute bottom-0.5 right-1 size-7 rounded-full bg-white border-2 cursor-help"
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                Verified Talent by DevJobs Network
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4 pt-12">
                <div>
                    <h3 className="font-bold text-xl leading-tight">{talent.name}</h3>
                    <p className="text-sm text-primary-lighter">{talent.role}</p>

                    <p className="flex items-center gap-1 text-sm mt-1 text-gray-500">
                        <Icon icon="weui:location-filled"/>
                        {talent.location || "Bangladesh"}
                    </p>

                    {talent.bio && (
                        <p className="text-sm my-3 text-gray-700 line-clamp-3">
                            {talent.bio}
                        </p>
                    )}

                    <span className="text-sm font-semibold">Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {talent.skills.map((skill, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1.5 px-1.5 py-0.5 bg-gray-50 rounded-full border text-xs"
                            >
                                <Icon icon={skillIcons[skill] || "mdi:code-tags"}/>
                                <span className="font-medium">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-6">
                    <Button
                        size="lg"
                        href={`${PATHS.public.talentListing}/${talent.id}`}
                        className="w-full h-11 rounded-lg font-semibold bg-primary hover:bg-primary-light/90"
                    >
                        View Profile
                        <Icon icon="mdi:arrow-right" className="size-[1.15rem]"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

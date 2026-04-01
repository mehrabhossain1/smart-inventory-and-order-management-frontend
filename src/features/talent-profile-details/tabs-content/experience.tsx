import {TalentProfile} from "@/shared/types";
import {Icon} from "@iconify/react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

export default function Experience({profile}: { profile: TalentProfile }) {
    return (
        <div className="space-y-8">
            {profile.experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                    {index < profile.experience.length - 1 && (
                        <div
                            className="absolute left-6 top-16 h-[calc(100%+0rem)] w-[2px] bg-border"/>
                    )}
                    <div className="flex gap-4">
                        <div
                            className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            {
                                exp.logo ? (
                                    <Image src={exp.logo} alt={exp.company} width={40} height={40}
                                           className='size-[30px] rounded-lg'/>
                                ) : (
                                    <Icon
                                        icon="fluent:building-32-regular"
                                        className="size-6.5 text-primary"
                                    />
                                )
                            }
                        </div>
                        <div className="flex-1 pb-8">
                            <div className='flex items-center gap-3'>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {exp.position}
                                </h3>
                                {exp.current && (
                                    <Badge
                                        variant='outline'
                                        className='pt-1'
                                    >
                                        Current Position
                                    </Badge>
                                )}
                            </div>
                            <a href='#' className="text-primary-light hover:underline">
                                {exp.company}
                            </a>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {exp.duration}
                            </p>
                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
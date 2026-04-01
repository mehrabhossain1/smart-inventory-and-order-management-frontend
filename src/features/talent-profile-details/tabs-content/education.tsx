import {Icon} from "@iconify/react";
import {TalentProfile} from "@/shared/types";

export default function Education({profile}: { profile: TalentProfile }) {
    return (
        <div className="space-y-8">
            {profile.education.map((edu, index) => (
                <div key={edu.id} className="relative">
                    {index < profile.education.length - 1 && (
                        <div
                            className="absolute left-6 top-16 h-[calc(100%+0rem)] w-[2px] bg-border"/>
                    )}
                    <div className="flex gap-4">
                        <div
                            className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <Icon
                                icon="material-symbols:school-outline-rounded"
                                className="size-6.5 text-primary"
                            />
                        </div>
                        <div className="flex-1 pb-8">
                            <div className='flex items-center gap-3'>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {edu.degree}
                                </h3>
                            </div>
                            <a href='#' className="text-primary-light hover:underline">
                                {edu.institution}
                            </a>
                            <p className="mt-1 text-muted-foreground leading-relaxed">
                                {edu.field}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {edu.year}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
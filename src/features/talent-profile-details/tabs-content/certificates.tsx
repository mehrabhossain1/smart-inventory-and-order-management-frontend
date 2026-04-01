import {Icon} from "@iconify/react";
import {TalentProfile} from "@/shared/types";

export default function Certificates({profile}: { profile: TalentProfile }) {
    return (
        <div className="grid gap-6 sm:grid-cols-4">
            {profile.certifications.map((cert) => (
                <div
                    key={cert.id}
                    className="rounded-lg relative h-full"
                >
                    <div
                        className="p-2 rounded-lg absolute bg-white z-10 top-0 right-0"
                    >
                        <Icon
                            icon="fluent:certificate-32-filled"
                            className="size-9 text-primary"
                        />
                    </div>

                    <div className="clip-top-right h-full pr-8 bg-primary-light/5 p-5 rounded-lg">
                        <a href={cert.certificateUrl}
                           target="_blank" rel="noopener noreferrer"
                           className="font-semibold hover:text-primary-light transition-colors duration-200 text-foreground">
                            {cert.name}
                        </a>
                        <p className="text-sm mt-1 text-muted-foreground">
                            Issued by <a href={cert.platformUrl}
                                         target="_blank" rel="noopener noreferrer"
                                         className="text-primary-light hover:underline">{cert.issuer}</a>
                        </p>

                        <div
                            className="mt-4 inline-flex items-center gap-1.5 bg-primary-light/10 text-primary rounded-full border border-border px-3 py-1 text-xs">
                            <Icon icon="lets-icons:date-range" className="size-4"/>
                            <p className='text-xs mt-[0.15rem]'>{cert.year}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
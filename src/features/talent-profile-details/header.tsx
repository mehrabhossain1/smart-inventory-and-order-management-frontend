import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {TalentProfile} from "@/shared/types";

export default function Header({profile, handleContact, handleHire}: {
    profile: TalentProfile,
    handleContact: () => void,
    handleHire: () => void
}) {
    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                <div className='relative'>
                    <Image
                        src="/devjobs_white_logo.png"
                        alt="DevJobs Network"
                        width={40}
                        height={40}
                        className='size-[40px] rounded-lg absolute -bottom-2 -left-2'
                    />
                    <div className="size-[145px] rounded-lg clip-bottom-left">
                        <Image
                            src={profile.image}
                            alt={profile.name}
                            width={145}
                            height={145}
                            className="rounded-lg object-cover object-top"
                        />
                    </div>
                </div>


                <div className="flex-1">

                    <h1 className="text-3xl font-bold text-foreground">
                        {profile.name}
                    </h1>
                    <p className="text-base text-primary-lighter">
                        {profile.role}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Icon icon="akar-icons:location" className="size-4"/>
                            <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="iconamoon:clock" className="size-4"/>
                            <span>{profile.timezone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="humbleicons:briefcase" className="size-4"/>
                            <span>{profile.yearsOfExperience} years experience</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="ant-design:dollar-outlined" className="size-4"/>
                            <span>{profile.hourlyRate}/hr</span>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                        {profile.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                className='size-8 hover:bg-gray-100 text-[1.5rem] border border-border rounded-sm grid place-items-center'
                                rel="noopener noreferrer"
                            >
                                <Icon icon="mdi:linkedin"/>
                            </a>
                        )}
                        {profile.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='size-8 hover:bg-gray-100 text-[1.5rem] border border-border rounded-sm grid place-items-center'
                            >
                                <Icon icon="mdi:github"/>
                            </a>
                        )}
                        {profile.websiteUrl && (
                            <a
                                href={profile.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='size-8 hover:bg-gray-100 text-[1.4rem] border border-border rounded-sm grid place-items-center'
                            >
                                <Icon icon="iconoir:internet"/>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 sm:justify-end">
                <Button
                    variant="outline"
                    onClick={handleContact}
                    className="flex-1 py-5 sm:flex-none"
                >
                    <Icon icon="material-symbols:mail-outline-rounded" className="size-5"/>
                    Contact
                </Button>
                <div className='w-max relative'>
                    {
                        profile.available && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center size-5">
                                <span
                                    className="absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75 animate-ping"></span>
                                <span className="relative inline-flex size-4 rounded-full bg-primary-light"></span>
                            </span>
                        )
                    }
                    <Button
                        onClick={handleHire}
                        className="flex-1 py-5 sm:flex-none font-medium bg-primary hover:bg-primary-lighter/90 flex items-center gap-2"
                    >
                        <Icon icon="la:user-solid" className="size-6"/>
                        Hire Now
                    </Button>
                </div>

            </div>
        </div>
    )
}
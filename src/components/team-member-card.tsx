"use client";

import { Icon } from "@iconify/react";

export interface TeamMember {
    name: string;
    role: string;
    expertise?: string;
    image: string;
    linkedinLink?: string;
    githubLink?: string;
    websiteLink?: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
}

const socialLinks = [
    { key: "linkedinLink", icon: "mdi:linkedin", label: "LinkedIn" },
    { key: "githubLink", icon: "mdi:github", label: "GitHub" },
    { key: "twitterLink", icon: "bi:twitter-x", label: "X" },
    { key: "facebookLink", icon: "mdi:facebook", label: "Facebook" },
    { key: "behanceLink", icon: "mdi:behance", label: "Behance" },
    { key: "figmaLink", icon: "logos:figma", label: "Figma" },
    { key: "websiteLink", icon: "mdi:web", label: "Website" },
] as const;

export function TeamMemberCard({ member }: TeamMemberCardProps) {
    const availableSocials = socialLinks.filter(
        (social) => member[social.key as keyof TeamMember],
    );

    return (
        <div className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer">
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Social icons container - appears on hover */}
            {availableSocials.length > 0 && (
                <div className="absolute top-0 right-3 flex flex-col gap-2 pt-3">
                    {availableSocials.map((social, index) => (
                        <a
                            key={social.key}
                            href={
                                member[social.key as keyof TeamMember] as string
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center 
                                       opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 
                                       hover:scale-110 transition-all duration-300"
                            style={{ transitionDelay: `${index * 50}ms` }}
                            aria-label={social.label}
                        >
                            <Icon icon={social.icon} className="text-lg" />
                        </a>
                    ))}
                </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 w-full h-[50%] z-10 bg-gradient-to-t from-black to-transparent" />

            {/* Name and role */}
            <div className="absolute z-20 bottom-0 left-0 right-0 px-5 py-4 text-center">
                <h3 className="font-bold text-lg text-white">{member.name}</h3>
                <p className="text-sm text-primary-lighter">{member.role}</p>
            </div>
        </div>
    );
}

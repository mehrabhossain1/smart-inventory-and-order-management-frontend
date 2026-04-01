"use client";

import {useState} from "react";
import {Icon} from "@iconify/react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {FilterState} from "@/features/talents/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type TalentFilterSidebarProps = {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    className?: string;
};

const roleCategories = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "Mobile Developer",
    "Data Engineer",
];

const skillsList = [
    {name: "React", count: 24},
    {name: "Next.js", count: 18},
    {name: "TypeScript", count: 32},
    {name: "Node.js", count: 15},
    {name: "Python", count: 12},
    {name: "Vue.js", count: 8},
    {name: "AWS", count: 10},
    {name: "Docker", count: 14},
];

const availabilityOptions = [
    "Available Now",
    "Within 2 Weeks",
    "Within 1 Month",
];

export function TalentFilterSidebar({
                                        filters,
                                        onFiltersChange,
                                        className,
                                    }: TalentFilterSidebarProps) {
    const [skillSearch, setSkillSearch] = useState("");

    const filteredSkills = skillsList.filter((skill) =>
        skill.name.toLowerCase().includes(skillSearch.toLowerCase())
    );

    const toggleRole = (role: string) => {
        const newRoles = filters.roles.includes(role)
            ? filters.roles.filter((r) => r !== role)
            : [...filters.roles, role];
        onFiltersChange({...filters, roles: newRoles});
    };

    const toggleSkill = (skill: string) => {
        const newSkills = filters.skills.includes(skill)
            ? filters.skills.filter((s) => s !== skill)
            : [...filters.skills, skill];
        onFiltersChange({...filters, skills: newSkills});
    };

    const toggleAvailability = (availability: string) => {
        const newAvailability = filters.availability.includes(availability)
            ? filters.availability.filter((a) => a !== availability)
            : [...filters.availability, availability];
        onFiltersChange({...filters, availability: newAvailability});
    };

    return (
        <aside className={cn("w-64 sticky top-26", className)}>

            <p className="text-base mb-1 font-medium text-accent-foreground">Category</p>
            <Select>
                <SelectTrigger className="py-5 w-full border-border focus-visible:ring-primary-lighter/30">
                    <SelectValue placeholder="Select Category"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        roleCategories.map((role) => (
                            <SelectItem value="popular">
                                {role.replace(" Developer", "").replace(" Engineer", "")}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <p className="text-base mt-5 mb-1 font-medium text-accent-foreground">Location</p>
            <Select>
                <SelectTrigger className="py-5 w-full border-border focus-visible:ring-primary-lighter/30">
                    <SelectValue placeholder="Select Location"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        roleCategories.map((role) => (
                            <SelectItem value="popular">
                                {role.replace(" Developer", "").replace(" Engineer", "")}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <div className="space-y-1 mt-5">
                <p className="text-base font-medium text-accent-foreground">Skills</p>
                <div className="relative">
                    <Icon
                        icon="iconoir:search"
                        className="absolute size-5 left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        type="text"
                        placeholder="Search skill"
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                        className="py-5 pl-9 text-sm border-border focus-visible:ring-primary-lighter/30"
                    />
                </div>
                <div className="space-y-2 mt-3">
                    {filteredSkills.map((skill) => (
                        <div key={skill.name} className="flex items-center gap-2">
                            <Checkbox
                                id={`skill-${skill.name}`}
                                checked={filters.skills.includes(skill.name)}
                                onCheckedChange={() => toggleSkill(skill.name)}
                            />
                            <Label
                                htmlFor={`skill-${skill.name}`}
                                className="flex-1 cursor-pointer text-sm font-normal text-foreground"
                            >
                                {skill.name}
                            </Label>
                            <span className="text-xs text-muted-foreground">
                ({skill.count})
              </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2 mt-7">
                <p className="text-base font-medium text-accent-foreground">
                    Experience (Years)
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>From</span>
                    <span>To</span>
                </div>
                <div className="flex items-center mt-3 gap-3">
                    <Input
                        type="number"
                        min={0}
                        max={20}
                        value={filters.experienceRange[0]}
                        onChange={(e) =>
                            onFiltersChange({
                                ...filters,
                                experienceRange: [
                                    Number(e.target.value),
                                    filters.experienceRange[1],
                                ],
                            })
                        }
                        className="py-5 border-border focus-visible:ring-primary-lighter/30 w-full text-sm"
                    />
                    <Input
                        type="number"
                        min={0}
                        max={20}
                        value={filters.experienceRange[1]}
                        onChange={(e) =>
                            onFiltersChange({
                                ...filters,
                                experienceRange: [
                                    filters.experienceRange[0],
                                    Number(e.target.value),
                                ],
                            })
                        }
                        className="py-5 border-border focus-visible:ring-primary-lighter/30 w-full text-sm"
                    />
                </div>
                <Slider
                    value={filters.experienceRange}
                    onValueChange={(value) =>
                        onFiltersChange({
                            ...filters,
                            experienceRange: value as [number, number],
                        })
                    }
                    min={0}
                    max={20}
                    step={1}
                    className="mt-5"
                />
            </div>
        </aside>
    );
}

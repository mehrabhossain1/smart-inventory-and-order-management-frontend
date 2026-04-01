"use client";

import {useState} from "react";
import {Icon} from "@iconify/react";
import {TalentProfileCard} from "@/components/talent-profile-card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {FilterState} from "@/features/talents/types";
import {TalentFilterSidebar} from "@/features/talents/talent-filter-sidebar";
import {sampleTalents} from "@/helpers/constant";

export default function FilterAndTalents() {

    const skillIcons: Record<string, string> = {
        React: "logos:react",
        "Next.js": "logos:nextjs-icon",
        TypeScript: "logos:typescript-icon",
        JavaScript: "logos:javascript",
        "Node.js": "logos:nodejs-icon",
        Vue: "logos:vue",
        Python: "logos:python",
        Django: "logos:django-icon",
        PostgreSQL: "logos:postgresql",
        AWS: "logos:aws",
        Docker: "logos:docker-icon",
        Kubernetes: "logos:kubernetes",
        MongoDB: "logos:mongodb-icon",
        GraphQL: "logos:graphql",
        Firebase: "logos:firebase",
        "Tailwind CSS": "logos:tailwindcss-icon",
        Figma: "logos:figma",
    };

    const [filters, setFilters] = useState<FilterState>({
        roles: [],
        skills: [],
        experienceRange: [0, 10],
        availability: [],
    });
    const [sortBy, setSortBy] = useState("popular");

    const handleViewProfile = (id: string) => {
        const talent = sampleTalents.find((t) => t.id === id);
        if (talent) {
            alert(`Viewing profile: ${talent.name}`);
        }
    };

    // Filter talents based on selected filters
    const filteredTalents = sampleTalents
        .filter((talent) => {
            if (
                filters.roles.length > 0 &&
                !filters.roles.includes(talent.role)
            ) {
                return false;
            }
            if (
                filters.skills.length > 0 &&
                !filters.skills.some((skill) => talent.skills.includes(skill))
            ) {
                return false;
            }
            if (
                filters.availability.length > 0 &&
                filters.availability.includes("Available Now") &&
                !talent.available
            ) {
                return false;
            }
            return true;
        })
    ;

    return (
        <main id={'all-talents'} className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="mb-8 flex items-center justify-between">
                    <h5 className="text-2xl font-bold text-foreground">
                        All Talents
                    </h5>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="py-5 border-border focus-visible:ring-primary-lighter/30 w-40">
                            <SelectValue placeholder="Sort by"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Sort by Popular</SelectItem>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-8 items-start">
                    <TalentFilterSidebar
                        filters={filters}
                        onFiltersChange={setFilters}
                        className="shrink-0"
                    />

                    <div className="flex-1">
                        <div
                            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                            {filteredTalents.map((talent) => (
                                <TalentProfileCard
                                    key={talent.id}
                                    talent={talent}
                                    skillIcons={skillIcons}
                                />
                            ))}
                        </div>

                        {filteredTalents.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <Icon
                                    icon="mdi:account-search"
                                    className="mb-4 text-6xl text-muted-foreground/50"
                                />
                                <h3 className="text-lg font-semibold text-foreground">
                                    No talents found
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try adjusting your filters to find more results.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

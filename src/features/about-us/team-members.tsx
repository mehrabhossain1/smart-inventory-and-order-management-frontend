import { teamMembers } from "@/helpers/constant";
import { Button } from "@/components/ui/button";
import { TeamMemberCard } from "@/components/team-member-card";

export function TeamMembers() {
    return (
        <section id="team" className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl mt-6 mb-1 sm:text-4xl font-bold">
                        Meet Our Teams
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Passionate developers who guide and support our
                        community every day
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {teamMembers.map((team) => (
                        <TeamMemberCard key={team.name} member={team} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">
                        Interested in Joining to DevJobs Network?
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full h-14 !px-8 text-base font-medium bg-primary hover:bg-primary-light/90"
                    >
                        Apply to Join Our Team
                    </Button>
                </div>
            </div>
        </section>
    );
}

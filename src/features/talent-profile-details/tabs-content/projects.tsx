import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {ArrowUpRight} from "lucide-react";
import {TalentProfile} from "@/shared/types";

export default function Projects({profile, skillIcons = {} as Record<string, string>}: {
    profile: TalentProfile,
    skillIcons?: Record<string, string>
}) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.portfolio.map((project) => (
                <Card
                    key={project.id}
                    className="group overflow-hidden py-0 shadow-none border-border transition-shadow hover:shadow-lg"
                >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <CardContent className="p-6 flex flex-col pt-0 h-[60%]">
                        <div className='flex-1'>
                            <h3 className="font-semibold text-foreground">
                                {project.title}
                            </h3>
                            <p title={project.description}
                               className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {skillIcons[tag] && (
                                            <Icon
                                                icon={skillIcons[tag]}
                                                className="mr-1 !size-3.5"
                                            />
                                        )}
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        {project.link && (
                            <Button
                                variant='default'
                                size='lg'
                                href={project.link}
                                className="mt-auto py-5 w-full"
                            >
                                View Project
                                <ArrowUpRight size={20}/>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
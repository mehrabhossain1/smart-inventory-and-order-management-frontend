"use client";

import {useState} from "react";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RootWrapper from "@/shared/root-wrapper";
import Image from "next/image";
import Experience from "@/features/talent-profile-details/tabs-content/experience";
import Projects from "@/features/talent-profile-details/tabs-content/projects";
import Education from "@/features/talent-profile-details/tabs-content/education";
import Certificates from "@/features/talent-profile-details/tabs-content/certificates";
import {sampleProfile} from "@/helpers/constant";
import Header from "@/features/talent-profile-details/header";

type TalentProfileDetailsProps = {
    talentId?: string;
};

export default function TalentDetails({
                                          talentId,
                                      }: TalentProfileDetailsProps) {
    const [activeTab, setActiveTab] = useState("experience");
    const profile = sampleProfile;

    const skillIcons: Record<string, string> = {
        React: "logos:react",
        "Next.js": "logos:nextjs-icon",
        TypeScript: "logos:typescript-icon",
        JavaScript: "logos:javascript",
        "Node.js": "logos:nodejs-icon",
        Python: "logos:python",
        PostgreSQL: "logos:postgresql",
        MongoDB: "logos:mongodb-icon",
        AWS: "logos:aws",
        Docker: "logos:docker-icon",
        GraphQL: "logos:graphql",
        "REST API": "carbon:api",
        "Tailwind CSS": "logos:tailwindcss-icon",
    };

    const handleContact = () => {
        alert(`Contact ${profile.name}`);
    };

    const handleHire = () => {
        alert(`Initiating hire process for ${profile.name}`);
    };

    function handleBack() {
        history.back();
    }

    return (
        <div className="min-h-screen overflow-clip relative z-0 pb-20 pt-32">

            <div
                className="absolute h-[200px] bg-gradient-to-b from-black/80 to-transparent inset-0 z-[-1]"/>
            <Image
                src='/brand_watermark.png'
                alt='image' width={1200} height={350}
                className='w-full h-[300px] mask-b-from-white object-cover absolute inset-0 z-[-2]'/>

            <RootWrapper>

                <Button
                    variant='ghost'
                    onClick={handleBack}
                    className="mb-12 -ml-2 text-accent hover:bg-primary/10"
                >
                    <Icon icon="iconoir:arrow-left" className="mr-1 size-4"/>
                    Back to Talents
                </Button>

                <Header profile={profile} handleContact={handleContact} handleHire={handleHire}/>

                <div className='mt-8 max-w-[800px]'>
                    <p className="text-muted-foreground leading-relaxed">
                        {profile.fullBio}
                    </p>

                    <p className="text-base mt-8 font-medium">
                        Skills
                    </p>
                    <div>
                        <div className="flex mt-2 flex-wrap gap-2">
                            {profile.skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="outline"
                                    className="px-3 py-1.5 text-sm font-normal bg-gray-50/50"
                                >
                                    {skillIcons[skill] && (
                                        <Icon
                                            icon={skillIcons[skill]}
                                            className="mr-1 !size-3.5"
                                        />
                                    )}
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-14">
                    <TabsList
                        className="mb-8 grid w-max !h-[50px] !py-0 !px-0 bg-gray-100 grid-cols-4">
                        <TabsTrigger value="experience"
                                     className='data-[state=active]:bg-primary-light data-[state=active]:text-white data-[state=active]:!shadow-none data-[state=active]:border-b-primary-light px-16 border-b-[3px] border-transparent data-[state=active]:rounded-lg rounded-r-none bg-gray-100'>Experience</TabsTrigger>
                        <TabsTrigger value="projects"
                                     className='data-[state=active]:bg-primary-light data-[state=active]:text-white data-[state=active]:!shadow-none data-[state=active]:border-b-primary-light px-16 border-b-[3px] border-transparent data-[state=active]:rounded-lg rounded-r-none bg-gray-100'>Projects</TabsTrigger>
                        <TabsTrigger value="education"
                                     className='data-[state=active]:bg-primary-light data-[state=active]:text-white data-[state=active]:!shadow-none data-[state=active]:border-b-primary-light px-16 border-b-[3px] border-transparent data-[state=active]:rounded-lg rounded-l-none bg-gray-100'>Education</TabsTrigger>
                        <TabsTrigger value="certifications"
                                     className='data-[state=active]:bg-primary-light data-[state=active]:text-white data-[state=active]:!shadow-none data-[state=active]:border-b-primary-light px-16 border-b-[3px] border-transparent data-[state=active]:rounded-lg rounded-l-none bg-gray-100'>Certifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="experience" className="max-w-[800px]">
                        <Experience profile={profile}/>
                    </TabsContent>

                    <TabsContent value="projects">
                        <Projects profile={profile} skillIcons={skillIcons}/>
                    </TabsContent>

                    <TabsContent value="education" className='max-w-[800px]'>
                        <Education profile={profile}/>
                    </TabsContent>

                    <TabsContent value="certifications">
                        <Certificates profile={profile}/>
                    </TabsContent>

                </Tabs>
            </RootWrapper>
        </div>
    );
}
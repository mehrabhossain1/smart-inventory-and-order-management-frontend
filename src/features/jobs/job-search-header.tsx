"use client";

import {Briefcase, DollarSign, MapPin, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import RootWrapper from "@/shared/root-wrapper";

export function JobSearchHeader() {
    return (
        <div className="border-b">
            <RootWrapper className='flex py-10 gap-10'>
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <Search className="size-6 text-muted-foreground"/>
                    <Select defaultValue="designer">
                        <SelectTrigger
                            className="border-border py-5 w-full focus-visible:ring-primary-lighter/30 shadow-none">
                            <SelectValue placeholder="Job title"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="designer">
                                Designer
                            </SelectItem>
                            <SelectItem value="developer">
                                Developer
                            </SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <MapPin className="size-6 text-muted-foreground"/>
                    <Select defaultValue="all">
                        <SelectTrigger
                            className="border-border py-5 w-full focus-visible:ring-primary-lighter/30 shadow-none">
                            <SelectValue placeholder="Work location"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                Work location
                            </SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">On-site</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <Briefcase className="size-6 text-muted-foreground"/>
                    <Select defaultValue="all">
                        <SelectTrigger
                            className="border-border w-full py-5 focus-visible:ring-primary-lighter/30 shadow-none">
                            <SelectValue placeholder="Experience"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Experience</SelectItem>
                            <SelectItem value="entry">
                                Entry level
                            </SelectItem>
                            <SelectItem value="junior">
                                Junior level
                            </SelectItem>
                            <SelectItem value="middle">
                                Middle level
                            </SelectItem>
                            <SelectItem value="senior">
                                Senior level
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <DollarSign className="size-6 text-muted-foreground"/>
                    <Select defaultValue="$100-$200">
                        <SelectTrigger
                            className="border-border w-full py-5 focus-visible:ring-primary-lighter/30 shadow-none">
                            <SelectValue placeholder="Salary Range"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="$100-$200">
                                $100-$200
                            </SelectItem>
                            <SelectItem value="$200-$300">$200-$300</SelectItem>
                            <SelectItem value="$300-$400">$300-$400</SelectItem>
                            <SelectItem value="$400-$500">$400-$500</SelectItem>
                            <SelectItem value="$500-$600">$500-$600</SelectItem>
                            <SelectItem value="$600-$700">$600-$700</SelectItem>
                            <SelectItem value="$700-$800">$700-$800</SelectItem>
                            <SelectItem value="$800-$900">$800-$900</SelectItem>
                            <SelectItem value="$900-$1000">$900-$1000</SelectItem>
                            <SelectItem value="$1000+">$1000+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </RootWrapper>
        </div>
    );
}

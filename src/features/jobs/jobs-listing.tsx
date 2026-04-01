"use client";

import {JobCard} from "./job-card";

const jobs = [
    {
        date: "20 May, 2023",
        company: "Amazon",
        title: "Senior UI/UX Designer",
        tags: ["Part time", "Senior level", "Distant", "Project work"],
        salary: "$250/hr",
        location: "San Francisco, CA",
        logo: "a",
        backgroundColor: "bg-orange-100",
        saved: false,
    },
    {
        date: "4 Feb, 2023",
        company: "Google",
        title: "Junior UI/UX Designer",
        tags: [
            "Full time",
            "Junior level",
            "Distant",
            "Project work",
            "Flexible Schedule",
        ],
        salary: "$150/hr",
        location: "California, CA",
        logo: "G",
        backgroundColor: "bg-teal-100",
        saved: true,
    },
    {
        date: "29 Jan, 2023",
        company: "Dribbble",
        title: "Senior Motion Designer",
        tags: ["Part time", "Senior level", "Full Day", "Shift work"],
        salary: "$260/hr",
        location: "New York, NY",
        logo: "●",
        backgroundColor: "bg-purple-100",
        saved: false,
    },
    {
        date: "11 Apr, 2023",
        company: "Twitter",
        title: "UX Designer",
        tags: ["Full time", "Middle level", "Distant", "Project work"],
        salary: "$120/hr",
        location: "California, CA",
        logo: "🐦",
        backgroundColor: "bg-blue-100",
        saved: false,
    },
    {
        date: "2 Apr, 2023",
        company: "Airbnb",
        title: "Graphic Designer",
        tags: ["Part time", "Senior level"],
        salary: "$300/hr",
        location: "New York, NY",
        logo: "🎈",
        backgroundColor: "bg-pink-100",
        saved: false,
    },
    {
        date: "18 Jan, 2023",
        company: "Apple",
        title: "Graphic Designer",
        tags: ["Part time", "Distant"],
        salary: "$140/hr",
        location: "San Francisco, CA",
        logo: "",
        backgroundColor: "bg-gray-100",
        saved: false,
    },
];

export function JobsListing() {
    return (
        <div className="flex-1 p-8 pr-0">
            <p className="text-2xl font-bold">Recommended jobs</p>

            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
}

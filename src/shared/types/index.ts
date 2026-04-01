export type AuthSlide = {
    image: string;
    title: string;
    subtitle: string;
};

export type FAQ = {
    id: string;
    question: string;
    answer: string;
    tags: string[];
};

export interface TalentProfile {
    id: string;
    name: string;
    role: string;
    location: string;
    bio: string;
    fullBio: string;
    skills: string[];
    image: string;
    available: boolean;
    linkedinUrl?: string;
    websiteUrl?: string;
    githubUrl?: string;
    email?: string;
    phone?: string;
    hourlyRate?: string;
    yearsOfExperience: number;
    languages: string[];
    timezone: string;
    experience: {
        id: string;
        company: string;
        position: string;
        duration: string;
        logo?: string;
        description: string;
        current?: boolean;
    }[];
    education: {
        id: string;
        institution: string;
        degree: string;
        field: string;
        year: string;
    }[];
    portfolio: {
        id: string;
        title: string;
        description: string;
        image: string;
        tags: string[];
        link?: string;
    }[];
    certifications: {
        id: string;
        name: string;
        platformUrl: string;
        issuer: string;
        certificateUrl?: string;
        year: string;
    }[];
};
import {TeamMember} from "@/components/team-member-card";
import {PATHS} from "@/config/paths";
import {AuthSlide, FAQ, TalentProfile} from "@/shared/types";
import type {Talent} from "@/components/talent-profile-card";

export const teamMembers: TeamMember[] = [
    {
        name: "Mohammad Arif",
        role: "Community Manager",
        expertise: "Frontend Development",
        image: "https://i.ibb.co.com/Lz5tV3Q8/arif.png",
        linkedinLink: "https://linkedin.com/in/",
        githubLink: "https://github.com/",
        websiteLink: "https://example.com/",
    },
    {
        name: "Mehrab Munna",
        role: "Community Manager",
        expertise: "Frontend Development",
        image: "https://i.ibb.co.com/WpRS8PGk/mehrab.png",
        linkedinLink: "https://linkedin.com/in/",
        githubLink: "https://github.com/",
    },
    {
        name: "Ahnaf Abid",
        role: "Community Manager",
        expertise: "Full Stack",
        image: "https://i.ibb.co.com/DHRp9k9p/afnaf.png",
        linkedinLink: "https://linkedin.com/in/",
        githubLink: "https://github.com/",
    },
    {
        name: "Mohammad Shahriar",
        role: "Community Moderator",
        expertise: "DevOps & Infrastructure",
        image: "https://i.ibb.co.com/9QcwKb1/sayem-1.png",
        linkedinLink: "https://linkedin.com/in/",
    },
    {
        name: "Sayem Sifat",
        role: "Community Moderator",
        expertise: "Mobile Development",
        image: "https://i.ibb.co.com/vCyv2qyc/sayem.png",
        githubLink: "https://github.com/",
    },
    {
        name: "Zamirul Islam",
        role: "Community Moderator",
        expertise: "Mobile Development",
        image: "https://i.ibb.co.com/c59s8bJ/zamirul.png",
        linkedinLink: "https://linkedin.com/in/",
        githubLink: "https://github.com/",
    },
];

export const navLinks = [
    {name: "Hire Talent", href: PATHS.public.talentListing},
    {name: "Find a Job", href: PATHS.public.jobListing},
    {name: "Blogs", href: PATHS.public.blogs},
    {name: "About Us", href: PATHS.public.about},
    {name: "Contact Us", href: PATHS.public.contact},
];

export const stats = [
    {
        label: "Verified Job Posts",
        value: "1,200+",
        icon: "mdi:shield-check",
    },
    {
        label: "Tech Professionals",
        value: "8,000+",
        icon: "mdi:account-group",
    },
    {
        label: "Hiring Companies",
        value: "500+",
        icon: "mdi:office-building",
    },
    {
        label: "Active Discord Members",
        value: "3,500+",
        icon: "mdi:discord",
    },
];

export const partners = [
    {name: "ZenUI", logo: "https://zenui.net/footer_logo.png"},
    {name: "Company 2", logo: "/next.svg"},
    {name: "Company 3", logo: "/next.svg"},
    {name: "Company 4", logo: "/next.svg"},
    {name: "Company 5", logo: "/next.svg"},
    {name: "Company 6", logo: "/next.svg"},
];

export const trustStats = [
    {
        title: "90%+",
        subtitle: "Hiring Manager Satisfaction",
        description: "Based on post-hire feedback from companies.",
        icon: "mdi:thumb-up",
        highlight: true,
    },
    {
        title: "3x Faster",
        subtitle: "Placements compared to traditional hiring agencies.",
        description: "From job kickoff to signed offer",
        icon: "mdi:lightning-bolt",
    },
    {
        title: "1800+ Recruiters",
        subtitle: "Vetted specialists across tech, business & operations.",
        description: "Only top-performing recruiters accepted",
        icon: "mdi:account-group",
    },
    {
        title: "12 Days",
        subtitle: "Time to receive the first qualified shortlist.",
        description: "Zero wasted time on unqualified candidates.",
        icon: "mdi:calendar-clock",
    },
];

export const loginSlides: AuthSlide[] = [
    {
        image: "/landing.png",
        title: "Welcome Back!",
        subtitle: "Continue your journey with DevJobs Network",
    },
    {
        image: "/about-us.png",
        title: "Your Next Opportunity Awaits",
        subtitle: "Access thousands of developer jobs",
    },
    {
        image: "/talents.png",
        title: "Trusted by Developers",
        subtitle: "Join our growing community",
    },
];

export const registerSlides: AuthSlide[] = [
    {
        image: "/landing.png",
        title: "Find Your Dream Job",
        subtitle: "Connect with top tech companies worldwide",
    },
    {
        image: "/about-us.png",
        title: "Build Your Career",
        subtitle: "Join thousands of developers finding opportunities",
    },
    {
        image: "/talents.png",
        title: "Grow With Us",
        subtitle: "Your success is our mission",
    },
];

export const faqs: FAQ[] = [
    {
        id: "account-create",
        question: "How do I create an account on DevJobs Network?",
        answer:
            "Creating an account is simple. Click the SignUp (e.g. Join as Talent) button, register using your email or social login, verify your email address, and complete your profile to start using the platform.",
        tags: ["account", "signup", "profile"],
    },
    {
        id: "account-free",
        question: "Is DevJobs Network free for tech talents?",
        answer:
            "Yes. DevJobs Network is completely free for tech talents. You can create a public profile, showcase your skills, explore verified jobs, and apply without any cost.",
        tags: ["pricing", "free", "talent"],
    },
    {
        id: "profile-public",
        question: "Can I use my DevJobs profile as a public portfolio?",
        answer:
            "Yes. Your DevJobs Network gives a public profile URL like a professional portfolio. You can share it publicly to showcase your skills, experience, projects, and professional presence.",
        tags: ["profile", "portfolio", "public"],
    },
    {
        id: "profile-visibility",
        question: "Who can see my profile information?",
        answer:
            "You control what information is visible. Public profiles can be viewed by companies and recruiters, while sensitive details remain protected according to your privacy settings.",
        tags: ["privacy", "profile", "visibility"],
    },
    {
        id: "job-apply-multiple",
        question: "Can I apply to multiple jobs at the same time?",
        answer:
            "Yes. You can apply to multiple job opportunities. We recommend tailoring your profile and communication to each role to improve your chances.",
        tags: ["jobs", "applications"],
    },
    {
        id: "job-response-time",
        question: "How long does it take to hear back from companies?",
        answer:
            "Response times vary by company. Most verified companies respond within 1–2 weeks, but timelines depend on their hiring process.",
        tags: ["jobs", "applications", "companies"],
    },
    {
        id: "job-verification",
        question: "How does DevJobs Network verify job postings?",
        answer:
            "All job posts are reviewed to meet our minimum requirements (you can see our list of minimum requirements terms page), including company details, salary range, work type, role clarity, and basic requirements. Unverified or misleading jobs are not published.",
        tags: ["verification", "jobs", "trust"],
    },
    {
        id: "job-requirements",
        question: "What information must a job post include?",
        answer:
            "Every job listing must include company name, job title, working hours, salary range, remote or onsite status, and clear role responsibilities and requirements.",
        tags: ["jobs", "companies", "verification"],
    },
    {
        id: "company-verification",
        question: "How are companies verified on DevJobs Network?",
        answer:
            "Currently, companies cannot directly post jobs on DevJobs. We manually verify each job post and share it within our network. Direct job posting by companies will be available very soon.",
        tags: ["companies", "verification", "trust"],
    },
    {
        id: "company-blacklist",
        question: "What happens if a company receives bad reviews?",
        answer:
            "If we receive enough authentic, verified reports of unethical behavior or a harmful work environment, the company may be blacklisted, its posts removed, and its account disabled.",
        tags: ["companies", "reviews", "moderation"],
    },
    {
        id: "talent-verification",
        question: "Does DevJobs Network verify tech talents?",
        answer:
            "We plan to verify tech talents in the future through mock interview, profile reviews, community behavior, and feedback, so that companies can hire with confidence.",
        tags: ["talent", "verification"],
    },
    {
        id: "reviews-system",
        question: "How do reviews work on DevJobs Network?",
        answer:
            "Profiles and companies may receive public reviews. All reviews are monitored, and false or abusive feedback is removed after verification.",
        tags: ["reviews", "trust", "community"],
    },
    {
        id: "moderation",
        question: "How is content moderated on the platform?",
        answer:
            "All activity is actively monitored. We review job posts, profiles, reviews, and community content to maintain a trustworthy and professional environment.",
        tags: ["moderation", "community", "trust"],
    },
    {
        id: "discord-rules",
        question: "What are the rules for the DevJobs Network Discord community?",
        answer:
            "Promotional, scam, or misleading posts are not allowed. Violations may result in a 7-day ban. Repeated violations lead to permanent removal from the Discord server.",
        tags: ["discord", "community", "rules"],
    },
    {
        id: "account-suspension",
        question: "Can my account be suspended or banned?",
        answer:
            "Yes. If verified reports confirm unethical behavior, scams, or repeated violations, your account may be suspended for 7 days or permanently banned.",
        tags: ["account", "termination", "policies"],
    },
    {
        id: "job-guarantee",
        question: "Does DevJobs Network guarantee a job?",
        answer:
            "No. We do not guarantee employment. Our role is to connect tech talents with verified opportunities and create a trusted hiring ecosystem.",
        tags: ["jobs", "disclaimer"],
    },
    {
        id: "data-privacy",
        question: "How is my data protected?",
        answer:
            "We take data protection seriously and follow strict privacy practices. Your information is handled securely and transparently according to our Privacy Policy.",
        tags: ["privacy", "security", "data"],
    },
    {
        id: "support-help",
        question: "How can I contact support?",
        answer:
            "You can contact our support team through the Help Center, community channels, or official contact options listed on the website.",
        tags: ["support", "help"],
    },
];

export const sampleProfile: TalentProfile = {
    id: "1",
    name: "Asfak Ahmed",
    role: "Full Stack Developer",
    location: "Dhaka, Bangladesh",
    bio: "Senior developer with 4+ years building scalable web applications.",
    fullBio:
        "Passionate full-stack developer with over 4 years of experience building scalable, high-performance web applications. Specialized in modern JavaScript frameworks and cloud technologies. I love solving complex problems and creating seamless user experiences. Currently focused on building enterprise-level applications using React, Next.js, and Node.js.",
    skills: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "PostgreSQL",
        "MongoDB",
        "AWS",
        "Docker",
        "GraphQL",
        "REST API",
        "Tailwind CSS",
    ],
    image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    available: true,
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com",
    email: "asfak@example.com",
    phone: "+880 1234-567890",
    hourlyRate: "$45-65",
    yearsOfExperience: 4,
    languages: ["English (Fluent)", "Bengali (Native)"],
    timezone: "GMT+6 (Dhaka)",
    experience: [
        {
            id: "1",
            company: "TechCorp Solutions",
            position: "Senior Full Stack Developer",
            duration: "Jan 2023 - Present",
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/60px-Google_%22G%22_logo.svg.png?20230822192911',
            description:
                "Lead developer for enterprise-level SaaS applications. Architected and implemented microservices using Node.js and React. Mentored junior developers and conducted code reviews.",
            current: true,
        },
        {
            id: "2",
            company: "Digital Innovations Ltd",
            position: "Full Stack Developer",
            duration: "Jun 2021 - Dec 2022",
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/60px-Google_%22G%22_logo.svg.png?20230822192911',
            description:
                "Developed and maintained multiple client projects using React and Node.js. Improved application performance by 40% through optimization techniques.",
        },
        {
            id: "3",
            company: "StartupHub",
            position: "Junior Developer",
            duration: "Jan 2020 - May 2021",
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/60px-Google_%22G%22_logo.svg.png?20230822192911',
            description:
                "Built responsive web applications using React and Express. Collaborated with design team to implement pixel-perfect UI components.",
        },
    ],
    education: [
        {
            id: "1",
            institution: "Bangladesh University of Engineering and Technology",
            degree: "Bachelor of Science",
            field: "Computer Science & Engineering",
            year: "2019",
        },
        {
            id: "2",
            institution: "Bangladesh University of Engineering and Technology",
            degree: "Bachelor of Science",
            field: "Computer Science & Engineering",
            year: "2019",
        },
        {
            id: "3",
            institution: "Bangladesh University of Engineering and Technology",
            degree: "Bachelor of Science",
            field: "Computer Science & Engineering",
            year: "2019",
        },
    ],
    portfolio: [
        {
            id: "1",
            title: "E-Commerce Platform",
            description:
                "Full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
            tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
            link: "#",
        },
        {
            id: "2",
            title: "Task Management App",
            description:
                "Collaborative task management application with real-time updates and team features.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
            tags: ["Next.js", "MongoDB", "Socket.io"],
            link: "#",
        },
        {
            id: "3",
            title: "Analytics Dashboard",
            description:
                "Real-time analytics dashboard with data visualization and reporting capabilities.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tags: ["React", "D3.js", "Express"],
            link: "#",
        },
    ],
    certifications: [
        {
            id: "1",
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            certificateUrl: 'https://hello.com',
            platformUrl: 'https://example.com',
            year: "2023",
        },
        {
            id: "2",
            name: "Meta Front-End Developer Professional",
            certificateUrl: 'https://hello.com',
            platformUrl: 'https://example.com',
            issuer: "Meta",
            year: "2022",
        },
        {
            id: "3",
            name: "Meta Front-End Developer Professional",
            certificateUrl: 'https://hello.com',
            platformUrl: 'https://example.com',
            issuer: "Meta",
            year: "2022",
        },
        {
            id: "4",
            name: "Meta Front-End Developer Professional",
            certificateUrl: 'https://hello.com',
            platformUrl: 'https://example.com',
            issuer: "Meta",
            year: "2022",
        },
        {
            id: "5",
            name: "Meta Front-End Developer Professional",
            certificateUrl: 'https://hello.com',
            platformUrl: 'https://example.com',
            issuer: "Meta",
            year: "2022",
        },
    ],
};

export const sampleTalents: Talent[] = [
    {
        id: "1",
        name: "Asfak Ahmed",
        role: "Full Stack Developer",
        location: "Bangladesh",
        bio: "Senior developer with 4+ years building scalable web applications. Specialized in React ecosystem and Node.js.",
        skills: ["React", "Next.js", "Node.js", "TypeScript", "TypeScript"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
    {
        id: "2",
        name: "Mehrab Munna",
        role: "Frontend Developer",
        location: "Bangladesh",
        bio: "Passionate frontend developer specializing in Vue.js and modern CSS frameworks. Creates pixel-perfect, responsive interfaces.",
        skills: ["Vue.js", "Tailwind CSS", "JavaScript"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
    {
        id: "3",
        name: "Ahnaf Abid",
        role: "Backend Developer",
        location: "Bangladesh",
        bio: "Expert backend engineer with deep knowledge of Python and Django. Builds robust, scalable server-side applications.",
        skills: ["Python", "Django", "PostgreSQL", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
    {
        id: "4",
        name: "Mohammad Shahriar",
        role: "DevOps Engineer",
        location: "Bangladesh",
        bio: "Cloud infrastructure specialist focused on AWS and containerization. Streamlines deployment pipelines and ensures reliability.",
        skills: ["AWS", "Docker", "Kubernetes"],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
    {
        id: "5",
        name: "Sarah Chen",
        role: "Full Stack Developer",
        location: "Singapore",
        bio: "Versatile developer with expertise in React and Python. Loves building products that solve real-world problems.",
        skills: ["React", "Python", "MongoDB", "GraphQL"],
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        available: false,
        linkedinUrl: "#",
    },
    {
        id: "6",
        name: "James Wilson",
        role: "Mobile Developer",
        location: "United Kingdom",
        bio: "React Native expert building cross-platform mobile apps. Focuses on performance and user experience.",
        skills: ["React", "TypeScript", "Firebase"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
    {
        id: "7",
        name: "Priya Sharma",
        role: "Data Engineer",
        location: "India",
        bio: "Data pipeline architect with strong Python and SQL skills. Transforms raw data into actionable insights.",
        skills: ["Python", "PostgreSQL", "AWS"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
    },
    {
        id: "8",
        name: "Michael Park",
        role: "Frontend Developer",
        location: "South Korea",
        bio: "UI/UX focused developer creating beautiful, accessible interfaces with React and modern CSS.",
        skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
        available: true,
        linkedinUrl: "#",
        websiteUrl: "#",
    },
];
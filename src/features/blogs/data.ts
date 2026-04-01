import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "10 Essential Skills Every Junior Developer Should Master in 2026",
        excerpt: "Starting your career as a developer can be overwhelming. Here are the key skills that will set you apart and accelerate your growth in the tech industry.",
        content: `Starting your career as a developer can be overwhelming with the vast amount of technologies and concepts to learn. However, focusing on the right skills can significantly accelerate your growth and make you stand out in the competitive job market.

## 1. Master the Fundamentals

Before diving into frameworks and libraries, ensure you have a solid understanding of programming fundamentals. This includes data structures, algorithms, and object-oriented programming concepts.

> "The fundamentals are the building blocks of everything you'll do in your career. Don't rush past them." - Senior Developer at Google

## 2. Version Control with Git

Git is non-negotiable in modern development. Understanding branching strategies, merge conflicts, and collaborative workflows is essential for working in any team.

## 3. Problem-Solving Skills

Technical skills are important, but the ability to break down complex problems into manageable pieces is what separates good developers from great ones.

## 4. Communication Skills

You'll spend more time communicating with teammates, stakeholders, and users than you might expect. Clear communication can prevent costly misunderstandings.

## 5. Testing Practices

Writing tests isn't just about catching bugs—it's about writing better, more maintainable code. Learn unit testing, integration testing, and test-driven development.`,
        category: "Career",
        tags: ["junior developer", "career advice", "skills", "learning"],
        author: {
            name: "Sarah Chen",
            role: "Senior Developer Advocate"
        },
        publishedAt: "Jan 15, 2026",
        readTime: "8 min read",
        likes: 342
    },
    {
        id: "2",
        title: "The Complete Guide to Remote Work for Developers",
        excerpt: "Remote work has become the new normal for many developers. Learn how to stay productive, maintain work-life balance, and thrive in a distributed team.",
        content: `Remote work offers incredible flexibility, but it also comes with unique challenges. After years of working remotely, I've gathered insights that can help you make the most of this arrangement.

## Setting Up Your Workspace

Your environment significantly impacts your productivity. Invest in a comfortable chair, proper lighting, and a reliable internet connection.

> "Your home office should be a place where you can focus deeply, not just a corner of your living room."

## Maintaining Work-Life Balance

When your home is your office, boundaries can blur. Establish clear working hours and stick to them.

## Staying Connected with Your Team

Remote work can feel isolating. Regular video calls, async communication, and virtual coffee chats help maintain team cohesion.

## Productivity Tips

- Use time-blocking techniques
- Take regular breaks
- Maintain a morning routine
- Set clear daily goals`,
        category: "Productivity",
        tags: ["remote work", "productivity", "work from home", "career"],
        author: {
            name: "Marcus Johnson",
            role: "Engineering Manager"
        },
        publishedAt: "Jan 12, 2026",
        readTime: "6 min read",
        likes: 289
    },
    {
        id: "3",
        title: "Understanding TypeScript: A Comprehensive Introduction",
        excerpt: "TypeScript has become essential for modern web development. This guide covers everything from basic types to advanced patterns.",
        content: `TypeScript adds static typing to JavaScript, making your code more robust and maintainable. Let's explore why it's become the standard for large-scale applications.

## Why TypeScript?

Type safety catches errors at compile time rather than runtime. This means fewer bugs in production and better developer experience with autocomplete and refactoring tools.

## Basic Types

TypeScript includes all JavaScript primitives plus additional types like \`any\`, \`unknown\`, \`never\`, and \`void\`.

## Interfaces and Types

Define the shape of your data with interfaces and type aliases. This serves as documentation and ensures consistency across your codebase.

> "TypeScript is JavaScript that scales. It's not just about types—it's about building maintainable software."

## Generics

Generics allow you to write reusable components that work with multiple types while maintaining type safety.`,
        category: "Technical",
        tags: ["typescript", "javascript", "programming", "web development"],
        author: {
            name: "Emily Rodriguez",
            role: "Frontend Architect"
        },
        publishedAt: "Jan 10, 2026",
        readTime: "12 min read",
        likes: 456
    },
    {
        id: "4",
        title: "How to Ace Your Technical Interview: Tips from Hiring Managers",
        excerpt: "Technical interviews can be nerve-wracking. Get insider tips from people who conduct them daily to improve your chances of landing your dream job.",
        content: `Technical interviews don't have to be terrifying. With the right preparation and mindset, you can showcase your skills effectively.

## Before the Interview

Research the company thoroughly. Understand their tech stack, products, and engineering culture. This shows genuine interest and helps you ask informed questions.

## During Coding Challenges

- Think out loud—interviewers want to see your problem-solving process
- Ask clarifying questions before diving in
- Start with a brute force solution, then optimize
- Test your code with edge cases

> "We're not looking for perfect code. We want to see how you think, communicate, and handle challenges."

## System Design Interviews

Focus on trade-offs rather than perfect solutions. Discuss scalability, reliability, and performance considerations.

## Behavioral Questions

Use the STAR method (Situation, Task, Action, Result) to structure your responses. Have specific examples ready.`,
        category: "Career",
        tags: ["interviews", "career advice", "job search", "hiring"],
        author: {
            name: "David Kim",
            role: "VP of Engineering"
        },
        publishedAt: "Jan 8, 2026",
        readTime: "10 min read",
        likes: 523
    },
    {
        id: "5",
        title: "Building Scalable APIs with Node.js and Express",
        excerpt: "Learn best practices for building production-ready APIs that can handle millions of requests while remaining maintainable.",
        content: `Building APIs that scale requires more than just writing endpoints. Let's explore patterns and practices that ensure your API can grow with your user base.

## Project Structure

Organize your code into logical modules: routes, controllers, services, and models. This separation of concerns makes testing and maintenance easier.

## Error Handling

Implement centralized error handling to ensure consistent error responses across your API.

## Authentication and Authorization

Use JWT tokens for stateless authentication. Implement role-based access control for fine-grained permissions.

> "A well-designed API is a joy to work with. It should be intuitive, consistent, and well-documented."

## Performance Optimization

- Use caching strategically
- Implement pagination for large datasets
- Optimize database queries
- Consider rate limiting`,
        category: "Technical",
        tags: ["nodejs", "api", "backend", "express"],
        author: {
            name: "Alex Thompson",
            role: "Backend Lead"
        },
        publishedAt: "Jan 5, 2026",
        readTime: "15 min read",
        likes: 387
    },
    {
        id: "6",
        title: "The Rise of AI in Software Development: What Developers Need to Know",
        excerpt: "AI tools are transforming how we write code. Understand the implications and learn how to leverage these tools effectively.",
        content: `AI coding assistants have revolutionized software development. From code completion to bug detection, these tools are becoming essential in the developer toolkit.

## Current State of AI in Development

Tools like GitHub Copilot, ChatGPT, and specialized coding assistants can significantly boost productivity when used correctly.

## Best Practices for AI-Assisted Development

- Always review generated code
- Use AI for boilerplate, not business logic
- Understand the code before committing
- Keep security implications in mind

> "AI is a powerful tool, but it's not a replacement for understanding. Use it to augment your skills, not replace them."

## The Future of Development

As AI continues to evolve, developers who can effectively collaborate with these tools will have a significant advantage.`,
        category: "Industry",
        tags: ["ai", "machine learning", "future of work", "tools"],
        author: {
            name: "Jennifer Liu",
            role: "AI Research Engineer"
        },
        publishedAt: "Jan 3, 2026",
        readTime: "7 min read",
        likes: 612
    },
    {
        id: "7",
        title: "Mastering CSS Grid and Flexbox: A Visual Guide",
        excerpt: "Stop struggling with layouts. This comprehensive guide will help you understand when and how to use CSS Grid and Flexbox.",
        content: `CSS layout has evolved dramatically. Understanding Grid and Flexbox is essential for creating responsive, maintainable layouts.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space along a single axis. Use it for navigation bars, card layouts, and centering content.

## CSS Grid: Two-Dimensional Layouts

Grid shines when you need control over both rows and columns. Perfect for page layouts, galleries, and complex component structures.

> "The key is knowing when to use each. Flexbox for components, Grid for page layouts—but don't be afraid to combine them."

## Common Patterns

- Holy Grail Layout with Grid
- Responsive card grids
- Sticky footers
- Equal-height columns`,
        category: "Technical",
        tags: ["css", "frontend", "web design", "responsive"],
        author: {
            name: "Chris Martinez",
            role: "UI Engineer"
        },
        publishedAt: "Dec 28, 2025",
        readTime: "9 min read",
        likes: 298
    },
    {
        id: "8",
        title: "Negotiating Your Developer Salary: A Complete Playbook",
        excerpt: "Most developers leave money on the table during negotiations. Learn proven strategies to maximize your compensation.",
        content: `Salary negotiation is a skill that can significantly impact your career earnings. Here's how to approach it with confidence.

## Know Your Worth

Research market rates using sites like Levels.fyi, Glassdoor, and LinkedIn Salary. Consider your location, experience, and specialized skills.

## The Negotiation Process

- Never share your current salary
- Let them make the first offer
- Consider the total package, not just base salary
- Be prepared to walk away

> "Negotiation isn't adversarial. You're finding a number that works for both parties. Companies expect you to negotiate."

## Beyond Base Salary

- Stock options and RSUs
- Signing bonuses
- Remote work flexibility
- Professional development budgets
- PTO and benefits`,
        category: "Career",
        tags: ["salary", "negotiation", "career advice", "compensation"],
        author: {
            name: "Rachel Green",
            role: "Tech Recruiter"
        },
        publishedAt: "Dec 25, 2025",
        readTime: "11 min read",
        likes: 445
    }
];

export function getBlogPost(id: string): BlogPost | undefined {
    return blogPosts.find((post) => post.id === id);
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
    return blogPosts
        .filter(
            (post) =>
                post.id !== currentPost.id &&
                (post.category === currentPost.category ||
                    post.tags.some((tag) => currentPost.tags.includes(tag)))
        )
        .slice(0, limit);
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
    return [...blogPosts].sort((a, b) => b.likes - a.likes).slice(0, limit);
}

export function getLatestPosts(limit = 3): BlogPost[] {
    return blogPosts.slice(0, limit);
}

export function getCategories(): string[] {
    return [...new Set(blogPosts.map((post) => post.category))];
}

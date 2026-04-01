export interface Author {
    name: string;
    avatar?: string;
    role: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    author: Author;
    publishedAt: string;
    readTime: string;
    likes: number;
}

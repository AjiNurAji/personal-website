export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content?: string | null;
    image: string;
    link?: string | null;
    github?: string | null;
    demo?: string | null;
    badges: any;
    featured: boolean;
}

export interface Skill {
    id: number;
    name: string;
    icon: string;
    category: string;
    order: number;
}

export interface Achievement {
    id: number;
    title: string;
    description: string;
    organization: string | null;
    year: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

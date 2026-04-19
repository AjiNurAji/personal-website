export interface Project {
	title: string;
	description: string;
	image: string;
	link: string;
	badges: string[];
	github?: string;
	demo?: string;
}

const projects: {
	featured: Project[];
	all: Project[];
} = {
	featured: [
		{
			title: "Project 1",
			description: "Description 1",
			image: "/images/project-1.jpg",
			link: "/projects/1",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-1",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 2",
			description: "Description 2",
			image: "/images/project-2.jpg",
			link: "/projects/2",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-2",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 3",
			description: "Description 3",
			image: "/images/project-3.jpg",
			link: "/projects/3",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-3",
			demo: "https://picsum.photos/200/300",
		},
	],
	all: [
		{
			title: "Project 1",
			description: "Description 1",
			image: "/images/project-1.jpg",
			link: "/projects/1",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-1",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 2",
			description: "Description 2",
			image: "/images/project-2.jpg",
			link: "/projects/2",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-2",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 3",
			description: "Description 3",
			image: "/images/project-3.jpg",
			link: "/projects/3",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-3",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 4",
			description: "Description 4",
			image: "/images/project-4.jpg",
			link: "/projects/4",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-4",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 5",
			description: "Description 5",
			image: "/images/project-5.jpg",
			link: "/projects/5",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-5",
			demo: "https://picsum.photos/200/300",
		},
		{
			title: "Project 6",
			description: "Description 6",
			image: "/images/project-6.jpg",
			link: "/projects/6",
			badges: ["TypeScript", "React", "Tailwind CSS"],
			github: "https://github.com/ajinuraji/project-6",
			demo: "https://picsum.photos/200/300",
		},
	],
};

export const projectsData = projects;

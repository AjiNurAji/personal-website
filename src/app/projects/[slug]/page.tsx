import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RiArrowLeftLine, RiGithubFill, RiExternalLinkLine } from "@remixicon/react";
import ReactMarkdown from "react-markdown";
import prisma from "~/lib/prisma";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export default async function ProjectDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const project = await prisma.project.findUnique({
		where: { slug },
	});

	if (!project) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background pt-24 pb-20">
			<div className="max-w-4xl mx-auto px-6">
				{/* Back Button */}
				<Link
					href="/"
					className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all mb-12 group"
				>
					<RiArrowLeftLine className="size-4 group-hover:-translate-x-1 transition-transform" />
					Back to Home
				</Link>

				{/* Header */}
				<header className="mb-12">
					<div className="flex flex-wrap gap-2 mb-6">
						{project.badges.map((badge) => (
							<Badge
								key={badge}
								variant="secondary"
								className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
							>
								{badge}
							</Badge>
						))}
					</div>
					<h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
						{project.title}
					</h1>
					<p className="text-xl text-muted-foreground leading-relaxed italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
						{project.description}
					</p>
				</header>

				{/* Featured Image */}
				<div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-16 shadow-2xl">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-4 mb-20">
					{project.demo && (
						<Link
							href={project.demo}
							target="_blank"
							className={cn(
								buttonVariants({ variant: "default", size: "lg" }),
								"rounded-full gap-2 px-8"
							)}
						>
							<RiExternalLinkLine className="size-5" />
							Live Preview
						</Link>
					)}
					{project.github && (
						<Link
							href={project.github}
							target="_blank"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"rounded-full gap-2 px-8"
							)}
						>
							<RiGithubFill className="size-5" />
							View Source Code
						</Link>
					)}
				</div>

				{/* Markdown Content */}
				<article className="prose prose-zinc dark:prose-invert max-w-none prose-h1:text-3xl prose-h1:font-black prose-h1:tracking-tighter prose-p:text-lg prose-p:leading-relaxed prose-img:rounded-2xl prose-a:text-blue-500">
					<ReactMarkdown>
						{project.content || "No details provided for this project yet."}
					</ReactMarkdown>
				</article>

				{/* Footer Navigation */}
				<div className="mt-32 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
					<p className="text-muted-foreground mb-6">Thanks for taking a look at this project!</p>
					<Link
						href="/"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"rounded-full px-8"
						)}
					>
						Explore More Projects
					</Link>
				</div>
			</div>
		</div>
	);
}

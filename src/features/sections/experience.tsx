import Image from "next/image";
import { Badge } from "~/components/ui/badge";

const Experience = () => {
	return (
		<section id="experience" className="relative px-6 py-20">
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
					<Badge variant="secondary">Experience</Badge>
					<h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
						Professional Journey
					</h2>
					<p className="text-muted-foreground">
						A timeline of my professional growth and key achievements
					</p>
				</div>
				<div className="relative">
					<div className="relative pl-8 not-last:pb-12">
						<div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
							<div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background"></div>
						</div>
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="relative shrink-0 size-10 rounded-lg bg-accent overflow-hidden flex justify-center items-center">
									<div className="relative size-7.5">
										<Image
											src="/assets/images/company/logo-bps.webp"
											alt="Placeholder"
											className="w-full h-full object-cover"
											loading="lazy"
											fill
										/>
									</div>
								</div>
								<span className="text-lg font-semibold">TechCorp Solutions</span>
							</div>
							<div>
								<h3 className="text-xl font-medium">Senior Full Stack Developer</h3>
								<div className="flex items-center gap-2 mt-1 text-sm">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-calendar size-4"
									>
										<path d="M8 2v4"></path>
										<path d="M16 2v4"></path>
										<rect width="18" height="18" x="3" y="4" rx="2"></rect>
										<path d="M3 10h18"></path>
									</svg>
									<span>2021 - Present</span>
								</div>
							</div>
							<p className="text-muted-foreground">
								Led the development of enterprise-scale web applications, mentored
								junior developers, and implemented best practices for code quality and
								performance optimization.
							</p>
							<div className="flex flex-wrap gap-2">
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 rounded-full"
								>
									React
								</span>
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 rounded-full"
								>
									Node.js
								</span>
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 rounded-full"
								>
									TypeScript
								</span>
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 rounded-full"
								>
									AWS
								</span>
								<span
									data-slot="badge"
									className="inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto border-transparent bg-secondary text-secondary-foreground [a&amp;]:hover:bg-secondary/90 rounded-full"
								>
									MongoDB
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experience;
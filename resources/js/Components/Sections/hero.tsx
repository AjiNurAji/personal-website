"use client";

import { RiFlashlightFill } from "@remixicon/react";
import PixelBlast from "@/Components/PixelBlast";
import { Badge } from "@/Components/UI/badge";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider
} from "@/Components/UI/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundDecorations } from "@/Components/Elements/BackgroundDecorations";

const Hero = () => {
	const { scrollY } = useScroll();

	const opacity = useTransform(scrollY, [0, 350], [1, 0]);
	const scale = useTransform(scrollY, [0, 350], [1, 0.9]);
	const y = useTransform(scrollY, [0, 350], [0, 50]);

	return (
		<section
			id="hero"
			className="sticky top-0 z-0 min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden bg-transparent"
		>
			<BackgroundDecorations />

			<div
				className="absolute inset-0 z-0 flex items-center justify-center blur-[1px] opacity-30"
				id="background-pattern"
			>
				<PixelBlast
					key="pixel-blast"
					variant="square"
					color="#888"
					pixelSize={2}
					patternScale={3}
					patternDensity={0.5}
					enableRipples
					rippleSpeed={0.2}
					rippleThickness={0.1}
					rippleIntensityScale={1}
					speed={0.3}
					transparent
					edgeFade={0.6}
				/>
			</div>

			{/* content of the section */}
			<motion.div
				style={{ opacity, scale, y }}
				className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 lg:max-w-5xl mx-auto"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="flex items-center gap-3 flex-wrap justify-center mb-8"
				>
					<Badge
						variant="default"
						className="px-4 py-1.5 text-xs font-bold rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xl border-zinc-800"
					>
						<RiFlashlightFill className="w-3.5 h-3.5 mr-2 animate-pulse" />
						Full Web Stack Developer
					</Badge>
					<div className="sm:hidden block">
						<Badge
							variant="outline"
							className="px-3 py-1 text-[10px] border-emerald-500/30 bg-emerald-500/5 text-emerald-500 backdrop-blur-xl"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-2 inline-block" />
							Available for Hire
						</Badge>
					</div>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
					animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
					transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
					className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.1] tracking-tighter"
				>
					Building <span className="bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-400 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-600">Digital</span> Experiences
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed"
				>
					Aji Nur Aji — Crafting modern, high-performance web applications with a focus on user experience and clean architecture.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-12 flex gap-4"
				>
					<div className="flex items-center gap-2 text-sm font-bold text-muted-foreground px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
						<span className="size-2 rounded-full bg-blue-500" />
						App Router
					</div>
					<div className="flex items-center gap-2 text-sm font-bold text-muted-foreground px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
						<span className="size-2 rounded-full bg-purple-500" />
						Supabase
					</div>
				</motion.div>
			</motion.div>

			{/* scroll down indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2 }}
				className="flex flex-col justify-center items-center gap-3 absolute bottom-12 w-full z-10"
			>
				<span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Exploring</span>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<motion.div
								animate={{ y: [0, 8, 0] }}
								transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
								className="flex w-7 h-11 rounded-full border-2 border-zinc-200 dark:border-zinc-800 justify-center items-start p-1 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
							>
								<div className="w-1.5 h-3 block rounded-full bg-zinc-900 dark:bg-white" />
							</motion.div>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Scroll to explore</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</motion.div>
		</section>
	);
};

export default Hero;

"use client";

import { RiFlashlightFill } from "@remixicon/react";
import PixelBlast from "~/components/PixelBlast";
import { Badge } from "~/components/ui/badge";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroHeadingAnimation, LetterAnimation } from "~/components/elements/LetterAnimation";

const Hero = () => {
	const { scrollY } = useScroll();

	const opacity = useTransform(scrollY, [0, 350], [1, 0]);
	const scale = useTransform(scrollY, [0, 350], [1, 0.8]);

	return (
		<motion.section
			style={{ opacity, scale }}
			id="hero"
			className="sticky top-0 z-1 min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden"
		>
			<div
				className="absolute inset-0 z-0 flex items-center justify-center blur-[1px] opacity-50"
				id="background-pattern"
			>
				<PixelBlast
					key="pixel-blast"
					variant="square"
					color="#666"
					pixelSize={3}
					patternScale={2}
					patternDensity={1}
					enableRipples
					rippleSpeed={0.3}
					rippleThickness={0.1}
					rippleIntensityScale={1}
					speed={0.5}
					transparent
					edgeFade={0.5}
				/>
			</div>

			{/* content of the section */}
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 lg:max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, filter: "blur(4px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{
						duration: 1.35,
					}}
				>
					<Badge variant="default" className="px-3 py-2 text-sm">
						<RiFlashlightFill />
						Full Web Stack Developer
					</Badge>
				</motion.div>
				<HeroHeadingAnimation
					text="Building Scalable & Engaging Web Experiences"
					className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.2]! tracking-tight"
				/>
				<LetterAnimation className="mt-6 text-[17px] md:text-lg text-muted-foreground max-w-screen-md overflow-hidden flex-wrap flex text-center justify-center items-center">
					Hey there! I'm a Aji Nur Aji , a Full Stack Developer who loves building
					cool and scalable web experiences. From crafting beautiful frontends to
					powering robust backends, I bring ideas to life with clean code and great
					design. Let's create something amazing together!
				</LetterAnimation>
			</div>

			{/* scroll down indicator */}
			<div className="flex flex-col justify-center items-center gap-1 absolute bottom-10 w-full z-10">
				<span className="animate-pulse text-xs">Scroll down</span>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex w-6 h-10 rounded-full border-2 border-primary justify-center items-start p-1 pt-1.5 overflow-hidden animate-pulse">
							<div className="w-2 h-3 block rounded-full bg-primary animate-bounce" />
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Scroll down</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</motion.section>
	);
};

export default Hero;

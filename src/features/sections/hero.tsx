"use client";

import { RiFlashlightFill } from "@remixicon/react";
import PixelBlast from "~/components/PixelBlast";
import { Badge } from "~/components/ui/badge";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";

export const Hero = () => {
	return (
		<section className="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
			<div
				className="absolute inset-0 z-0 flex items-center justify-center"
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
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
				<Badge variant="default" className="px-3 py-2 text-sm">
					<RiFlashlightFill />
					Full Web Stack Developer
				</Badge>
				<h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.2]! tracking-tight">
					Building Scalable & Engaging Web Experiences
				</h1>
				<p className="mt-6 text-[17px] md:text-lg text-muted-foreground">
					Hey there! I'm a Aji Nur Aji , a Full Stack Developer who loves building
					cool and scalable web experiences. From crafting beautiful frontends to
					powering robust backends, I bring ideas to life with clean code and great
					design. Let's create something amazing together! 🚀
				</p>
			</div>

			{/* scroll down indicator */}
			<div className="flex justify-center items-center gap-0 absolute bottom-10 w-full z-10">
				<Tooltip>
					<TooltipTrigger>
						<div className="w-6 h-10 rounded-full border-2 border-primary flex justify-center items-start p-1 pt-1.5 overflow-hidden animate-pulse">
							<div className="w-2 h-3 block rounded-full bg-primary animate-bounce" />
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Scroll down</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</section>
	);
};

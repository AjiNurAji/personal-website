"use client";

import { motion } from "framer-motion";

export const BackgroundDecorations = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
			{/* Ambient Glows */}
			<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
			<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
			
			{/* Technical Dots/Grid */}
			<div 
				className="absolute inset-0 opacity-[0.15]" 
				style={{ 
					backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`, 
					backgroundSize: '24px 24px' 
				}} 
			/>

			{/* Floating Shapes */}
			<motion.div
				animate={{
					y: [0, -20, 0],
					rotate: [0, 10, 0],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="absolute top-[20%] right-[15%] size-12 border border-zinc-200 dark:border-zinc-800 rounded-lg opacity-20"
			/>
			<motion.div
				animate={{
					y: [0, 20, 0],
					rotate: [0, -10, 0],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="absolute bottom-[20%] left-[10%] size-16 border border-zinc-200 dark:border-zinc-800 rounded-full opacity-20"
			/>
			
			<div className="absolute top-[15%] left-[15%] opacity-20 text-zinc-400 font-thin text-2xl">+</div>
			<div className="absolute bottom-[30%] right-[20%] opacity-20 text-zinc-400 font-thin text-2xl">+</div>

			{/* Ghost Text */}
			<div className="absolute left-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 pointer-events-none select-none">
				Full Stack Architecture // Optimized Performance // User Centric
			</div>
			<div className="absolute right-6 top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800 pointer-events-none select-none">
				Established MMXXIV // Personal Portfolio // V1.0.0
			</div>
		</div>
	);
};

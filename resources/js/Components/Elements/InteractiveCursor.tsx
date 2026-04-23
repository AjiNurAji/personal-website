"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const InteractiveCursor = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isPointer, setIsPointer] = useState(false);

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 400 };
	const springX = useSpring(cursorX, springConfig);
	const springY = useSpring(cursorY, springConfig);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);

        if (!isMobile) {
            document.body.classList.add("has-custom-cursor");
        }

		const handleMouseMove = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);

			const target = e.target as HTMLElement;
			setIsPointer(
				window.getComputedStyle(target).cursor === "pointer" ||
				target.tagName === "A" ||
				target.tagName === "BUTTON"
			);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", checkMobile);
            document.body.classList.remove("has-custom-cursor");
		};
	}, [cursorX, cursorY, isMobile]);

	if (isMobile) return null;

	return (
		<>
			{/* High-level Glow (Visible above background, below text) */}
			<motion.div
				className="fixed inset-0 z-[1] pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<motion.div
					className="absolute size-[800px] rounded-full bg-blue-500/[0.07] dark:bg-blue-400/[0.1] blur-[150px]"
					style={{
						left: springX,
						top: springY,
						translateX: "-50%",
						translateY: "-50%",
					}}
				/>
			</motion.div>

			{/* Main Interactive Ring */}
			<motion.div
				className="fixed top-0 left-0 size-8 border border-blue-500/30 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-colors"
				style={{
					x: springX,
					y: springY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isPointer ? 1.5 : 1,
					backgroundColor: isPointer ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0)",
					borderColor: isPointer ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)",
				}}
			/>

			{/* Center Dot */}
			<motion.div
				className="fixed top-0 left-0 size-1.5 bg-blue-500 rounded-full pointer-events-none z-[9999]"
				style={{
					x: cursorX,
					y: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					scale: isPointer ? 0.5 : 1,
				}}
			/>
		</>
	);
};

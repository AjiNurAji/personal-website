"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CursorGlow = () => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { damping: 25, stiffness: 700 };
	const cursorX = useSpring(mouseX, springConfig);
	const cursorY = useSpring(mouseY, springConfig);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<motion.div
			className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<motion.div
				className="absolute size-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"
				style={{
					left: cursorX,
					top: cursorY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			/>
		</motion.div>
	);
};

"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "~/lib/utils";

type AnimateVariant = "blur-fade" | "fade-left";

const variants: Record<AnimateVariant, Variants> = {
	"blur-fade": {
		hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
		visible: { opacity: 1, filter: "blur(0px)", y: 0 },
	},
	"fade-left": {
		hidden: { opacity: 0, x: -32 },
		visible: { opacity: 1, x: 0 },
	},
};

interface AnimateInProps {
	children: React.ReactNode;
	variant?: AnimateVariant;
	delay?: number;
	duration?: number;
	className?: string;
	/** Render as a different element, default is div */
	as?: React.ElementType;
}

export const AnimateIn = ({
	children,
	variant = "blur-fade",
	delay = 0,
	duration = 0.5,
	className,
}: AnimateInProps) => {
	return (
		<motion.div
			className={cn(className)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.2 }}
			variants={variants[variant]}
			transition={{ duration, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
};

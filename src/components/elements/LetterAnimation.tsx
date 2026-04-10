"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const LetterAnimation = ({
	children,
	isHeading = false,
	className = "",
}: {
	children: string;
	isHeading?: boolean;
	className?: string;
}) => {
	return isHeading ? (
		<HeadingAnimation text={children} className={className} />
	) : (
		<ParagraphAnimation text={children} className={className} />
	);
};

const HeadingAnimation = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => {
	const letters = Array.from(text);

	return (
		<motion.h1
			className={cn("text-4xl sm:text-5xl font-bold tracking-tight flex justify-center items-center max-w-screen-md overflow-hidden flex-wrap", className)}
		>
			{letters.map((letter, index) => (
				<motion.span
					initial={{ opacity: 0, filter: "blur(4px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{
						delay: index * 0.05,
						duration: 0.4,
					}}
					key={index}
				>
					{letter === " " ? "\u00A0" : letter}
				</motion.span>
			))}
		</motion.h1>
	);
};

const ParagraphAnimation = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => {
	const letters = Array.from(text);

	return (
		<motion.p className={cn("text-muted-foreground", className)}>
			{letters.map((letter, index) => (
				<motion.span
					initial={{ opacity: 0, filter: "blur(4px)" }}
					animate={{ opacity: 1, filter: "blur(0px)" }}
					transition={{
						duration: 1.35
					}}
					key={index}
				>
					{letter === " " ? "\u00A0" : letter}
				</motion.span>
			))}
		</motion.p>
	);
};

import React from "react";

export const PatternStripes = ({
	children,
	order = "normal",
}: {
	children: React.ReactNode;
	order?: "normal" | "reverse";
}) => {
	return (
		<div
			className="h-full w-full"
			style={{
				backgroundImage: order === "normal" ? "repeating-linear-gradient(45deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 10px)" : "repeating-linear-gradient(-45deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 10px)",
			}}
		>
			{children}
		</div>
	);
};

import React from "react";
import { cn } from "~/lib/utils";

export const PatternStripes = ({
	children,
	order = "normal",
}: {
	children: React.ReactNode;
	order?: "normal" | "reverse";
}) => {
	return (
		<div
			className={cn(
				"h-full w-full",
				order === "normal"
					? "bg-[repeating-linear-gradient(45deg,_#e5e7eb_0px,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]"
					: "bg-[repeating-linear-gradient(-45deg,_#e5e7eb_0px,_#e5e7eb_1px,_transparent_1px,_transparent_10px)]",
			)}
		>
			{children}
		</div>
	);
};

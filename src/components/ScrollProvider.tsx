"use client";
import Lenis from "lenis";
import React from "react";

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
	const lenisRef = React.useRef<Lenis | null>(null);

	React.useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		lenisRef.current = lenis;

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	});

	return <>{children}</>;
};

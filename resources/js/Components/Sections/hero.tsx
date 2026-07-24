"use client";

import { RiFlashlightFill, RiArrowDownLine } from "@remixicon/react";
import { Badge } from "@/Components/UI/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { ConstellationBg } from "@/Components/Elements/ConstellationBg";

interface HeroProps {
    title?: string;
    subtitle?: string;
    isAvailable?: boolean;
}

const floatingAnim = (delay: number) => ({
    animate: { y: [0, -12, 0] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
});

const Hero = ({ title, subtitle, isAvailable = true }: HeroProps) => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 350], [1, 0]);
    const scale = useTransform(scrollY, [0, 350], [1, 0.92]);
    const y = useTransform(scrollY, [0, 350], [0, 60]);

    return (
        <section
            id="hero"
            className="relative z-0 min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden bg-transparent"
        >
            <ConstellationBg />

            {/* Gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] rounded-full bg-purple-600/[0.08] blur-[140px]"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-500/[0.06] blur-[140px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.85, 0.6] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 lg:max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                    className="flex items-center gap-3 flex-wrap justify-center mb-10"
                >
                    <Badge
                        variant="default"
                        className="px-4 py-1.5 text-xs font-semibold rounded-full bg-white/[0.06] dark:bg-white/[0.08] text-zinc-200 dark:text-zinc-300 backdrop-blur-md border border-white/[0.1] shadow-lg"
                    >
                        <RiFlashlightFill className="w-3.5 h-3.5 mr-2" />
                        Full Stack Developer
                    </Badge>
                    {isAvailable && (
                        <Badge
                            variant="outline"
                            className="px-3 py-1 text-[10px] border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400 backdrop-blur-xl"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-2 inline-block" />
                            Available for Projects
                        </Badge>
                    )}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.15 }}
                    className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.05] tracking-tighter"
                >
                    {title || (
                        <>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400">
                                Building
                            </span>{" "}
                            <span className="text-white/90">Digital</span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-300 to-purple-400">
                                Experiences
                            </span>
                        </>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
                    className="mt-10 text-lg md:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed"
                >
                    {subtitle ||
                        "Crafting modern, high-performance web applications with a focus on user experience and clean architecture."}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
                    className="mt-14 flex gap-4 flex-wrap justify-center"
                >
                    {["Laravel", "React", "Inertia JS", "Tailwind CSS"].map((tech, i) => (
                        <span
                            key={tech}
                            className="flex items-center gap-2 text-sm font-semibold text-zinc-400 px-5 py-2.5 rounded-full glass transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
                        >
                            <span className={[
                                "size-2 rounded-full", 
                                i === 0 ? "bg-red-400" : i === 1 ? "bg-cyan-400" : i === 2 ? "bg-purple-400" : "bg-sky-400"
                            ].join(" ")} />
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 flex flex-col items-center gap-3 z-10"
            >
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <RiArrowDownLine className="w-5 h-5 text-zinc-500" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;

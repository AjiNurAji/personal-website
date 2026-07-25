"use client";

import { RiFlashlightFill, RiArrowDownLine, RiGithubFill, RiLinkedinBoxFill, RiInstagramLine, RiGlobalLine, RiBriefcase4Line, RiMailLine } from "@remixicon/react";
import { Badge } from "@/Components/UI/badge";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ConstellationBg } from "@/Components/Elements/ConstellationBg";
import { SafeImage } from "@/Components/Elements/SafeImage";
import { useEffect, useState, useRef } from "react";

interface HeroProps {
    title?: string;
    subtitle?: string;
    isAvailable?: boolean;
    aboutImage?: string;
    githubUrl?: string;
    contactEmail?: string;
    socialLinks?: Array<{ platform: string; url: string }>;
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'github': return <RiGithubFill className="w-4 h-4" />;
    case 'instagram': return <RiInstagramLine className="w-4 h-4" />;
    case 'linkedin': return <RiLinkedinBoxFill className="w-4 h-4" />;
    default: return <RiGlobalLine className="w-4 h-4" />;
  }
};

/** Typing effect hook — types out the subtitle character by character */
const useTypingEffect = (text: string, speed = 35, delay = 800) => {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayed, isDone };
};

const Hero = ({ title, subtitle, isAvailable = true, aboutImage, githubUrl, contactEmail, socialLinks }: HeroProps) => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 350], [1, 0]);
    const scale = useTransform(scrollY, [0, 350], [1, 0.92]);
    const y = useTransform(scrollY, [0, 350], [0, 60]);

    // ── Mouse parallax for gradient orbs ────────────────────────
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const orb1X = useSpring(useTransform(mouseX, [-1, 1], [-40, 40]), { stiffness: 50, damping: 40 });
    const orb1Y = useSpring(useTransform(mouseY, [-1, 1], [-40, 40]), { stiffness: 50, damping: 40 });
    const orb2X = useSpring(useTransform(mouseX, [-1, 1], [40, -40]), { stiffness: 40, damping: 35 });
    const orb2Y = useSpring(useTransform(mouseY, [-1, 1], [40, -40]), { stiffness: 40, damping: 35 });

    const sectionRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;  // -1 … 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    // ── Typing effect ────────────────────────────────────────────
    const defaultSubtitle = "Crafting modern, high-performance web applications with a focus on user experience and clean architecture.";
    const displaySubtitle = subtitle || defaultSubtitle;
    const { displayed, isDone } = useTypingEffect(displaySubtitle, 30, 600);

    // ── Social links (filter to main 3) ──────────────────────────
    const defaultSocials = socialLinks?.filter(s =>
      ['github', 'linkedin', 'instagram'].includes(s.platform)
    ) ?? [];

    // ── Profile image URL ────────────────────────────────────────
    const imageUrl = aboutImage?.startsWith('http')
      ? aboutImage
      : aboutImage
        ? `/storage/${aboutImage}`
        : null;

    return (
        <section
            ref={sectionRef}
            id="hero"
            onMouseMove={handleMouseMove}
            className="relative z-0 min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden bg-transparent"
        >
            <ConstellationBg />

            {/* ── Gradient orbs (mouse parallax) ─────────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] rounded-full bg-purple-600/[0.08] blur-[140px]"
                    style={{ x: orb1X, y: orb1Y }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] rounded-full bg-cyan-500/[0.06] blur-[140px]"
                    style={{ x: orb2X, y: orb2Y }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* ── Content (parallax scroll) ───────────────────────── */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 h-full text-center px-4 max-w-6xl mx-auto"
            >
                {/* Left column: Text + CTAs */}
                <div className="flex flex-col items-center max-w-2xl">
                    {/* Badges row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
                        className="flex items-center gap-3 flex-wrap justify-center lg:justify-start mb-10"
                    >
                        <Badge
                            variant="default"
                            className="px-4 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md border border-white/[0.1] shadow-lg"
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

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.15 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tighter"
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

                    {/* Typing subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.25 }}
                        className="mt-10 text-lg md:text-xl text-zinc-400 max-w-xl font-medium leading-relaxed min-h-[3.5rem]"
                    >
                        {displayed}
                        <span className={`inline-block w-0.5 h-5 ml-0.5 bg-cyan-400 align-middle ${isDone ? 'animate-pulse' : 'opacity-0'}`} />
                    </motion.p>

                    {/* Tech stack pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.35 }}
                        className="mt-8 flex gap-3 flex-wrap justify-center lg:justify-start"
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

                    {/* ── CTA Buttons + Social links ──────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                        className="mt-10 flex items-center gap-4 flex-wrap justify-center lg:justify-start"
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                        >
                            <RiBriefcase4Line className="w-4 h-4" />
                            View Projects
                        </a>
                        {contactEmail && (
                            <a
                                href={`mailto:${contactEmail}`}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.15] bg-white/[0.04] text-zinc-200 font-semibold text-sm backdrop-blur-md hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300"
                            >
                                <RiMailLine className="w-4 h-4" />
                                Get in Touch
                            </a>
                        )}

                        {/* Social links divider */}
                        {defaultSocials.length > 0 && (
                            <div className="flex items-center gap-2 ml-0 sm:ml-2 pl-0 sm:pl-4 border-0 sm:border-l border-white/[0.1]">
                                {defaultSocials.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                                        title={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right column: Profile image */}
                {imageUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
                        className="hidden lg:block flex-shrink-0"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-2xl" />
                            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-white/[0.1] shadow-2xl shadow-purple-500/10">
                                <SafeImage
                                    src={imageUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* ── Scroll indicator ─────────────────────────────────── */}
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

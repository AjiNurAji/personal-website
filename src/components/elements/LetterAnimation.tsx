"use client";

import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const LetterAnimation = ({
  children,
  isHeading = false,
  inView = false,
  className = "",
}: {
  children: string;
  isHeading?: boolean;
  /** Set true for scroll-triggered sections so animation re-plays on each scroll-in */
  inView?: boolean;
  className?: string;
}) => {
  return isHeading ? (
    <HeadingAnimation text={children} className={className} inView={inView} />
  ) : (
    <ParagraphAnimation text={children} className={className} inView={inView} />
  );
};

const HeadingAnimation = ({
  text,
  className,
  inView,
}: {
  text: string;
  className?: string;
  inView: boolean;
}) => {
  const words = text.trim().split(/\s+/);

  const wordVariants = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.45,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <h2
      className={cn(
        "flex flex-wrap justify-center items-center gap-y-1",
        "font-bold tracking-tight",
        className,
      )}
    >
      {words.map((word, index) =>
        inView ? (
          <motion.span
            key={index}
            className="inline-block mr-[0.3em] last:mr-0"
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={index}
          >
            {word}
          </motion.span>
        ) : (
          <motion.span
            key={index}
            className="inline-block mr-[0.3em] last:mr-0"
            initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
        ),
      )}
    </h2>
  );
};

// Hero heading — stays as h1 and uses on-mount animate
export const HeroHeadingAnimation = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const words = text.trim().split(/\s+/);

  return (
    <h1
      className={cn(
        "flex flex-wrap justify-center items-center gap-y-1",
        "font-bold tracking-tight",
        className,
      )}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.3em] last:mr-0"
          initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: index * 0.08,
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

const ParagraphAnimation = ({
  text,
  className,
  inView,
}: {
  text: string;
  className?: string;
  inView: boolean;
}) => {
  const words = text.trim().split(/\s+/);

  const wordVariants = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 6 },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <p
      className={cn(
        "flex flex-wrap gap-y-1 text-sm sm:text-base text-muted-foreground",
        className,
      )}
    >
      {words.map((word, index) =>
        inView ? (
          <motion.span
            key={index}
            className="inline-block mr-[0.3em] last:mr-0"
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            custom={index}
          >
            {word}
          </motion.span>
        ) : (
          <motion.span
            key={index}
            className="inline-block mr-[0.3em] last:mr-0"
            initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              delay: index * 0.06,
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
        ),
      )}
    </p>
  );
};

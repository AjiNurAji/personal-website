"use client";
import { RiDownload2Line, RiGithubFill } from "@remixicon/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "~/components/ui/badge"
import { buttonVariants } from "~/components/ui/button"
import { cn } from "~/lib/utils"

const About = () => {
  return (
    <motion.section 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-3 bg-background px-6 sm:px-0 border-y" id="about">
      <div className="max-w-screen-lg mx-auto border-x py-20 px-6">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <div className="mt-10 w-48 h-48 md:w-64 md:h-64 hidden md:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
              <Image src="https://shadcn-portfolio-template.vercel.app/placeholder.svg" alt="Placeholder" loading="lazy" fill />
            </div>
          </div>
          <div className="flex-1 md:text-left">
            <Badge variant="secondary">About Me</Badge>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Passionate about creating impactful web experiences</h2>
            <p className="text-muted-foreground mb-6 text-justify">With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.</p>
            <div className="flex flex-wrap gap-4 justify-start">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default" }), 'rounded-full')}>
              <RiGithubFill /> View GitHub</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), 'rounded-full')}>
              <RiDownload2Line /> Download CV</a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default About;
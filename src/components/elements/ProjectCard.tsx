import Image from "next/image"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { cn } from "~/lib/utils"
import { buttonVariants } from "../ui/button"
import { RiExternalLinkLine, RiGithubFill } from "@remixicon/react"
import Link from "next/link"

export const ProjectCard = () => {
  return (
    <Card className="pt-0 group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-accent h-64 w-full relative">
        <Image src="https://shadcn-portfolio-template.vercel.app/placeholder.svg" className="object-cover w-auto h-full transition-transform duration-300 group-hover:scale-105" alt="Placeholder" fill />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2">Project Name</h3>
        <p className="text-muted-foreground">
          A brief description of the project and its features.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>

        <div className="mt-auto pt-4 flex gap-4">
          <Link href="#" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({variant: 'default'}), 'rounded-full px-4 py-2 flex items-center gap-2 w-fit')}>
            <RiExternalLinkLine className="w-4 h-4" />
            Live Demo
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({variant: 'outline'}), 'rounded-full px-4 py-2 flex items-center gap-2 w-fit')}>
            <RiGithubFill className="w-4 h-4" />
            Source Code
          </Link>

        </div>
      </CardContent>
    </Card>
  )
}
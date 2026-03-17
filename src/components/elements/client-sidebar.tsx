import Image from "next/image"
import { Sidebar, SidebarHeader, SidebarTrigger } from "../ui/sidebar"

export const ClientSidebar =() => {
  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      {/* profile section */}
      <SidebarHeader className="flex justify-center items-center">
        <div className="w-30 h-30 rounded-full overflow-hidden">
          <Image
            src="https://github.com/ajinuraji.png"
            alt="User profile"
            className="w-full h-full object-cover"
            loading="lazy"
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col text-center justify-center items-center">
          <h2 className="text-lg font-semibold">Ajinuraji</h2>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </SidebarHeader>
    </Sidebar>
  )
}
import { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/UI/sidebar";
import { AppSidebar } from "@/Components/Dashboard/AppSidebar";
import { Separator } from "@/Components/UI/separator";
import { TooltipProvider } from "@/Components/UI/tooltip";
import { Head } from "@inertiajs/react";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
  return (
    <>
        <Head title={title} />
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{title}</span>
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-zinc-50/50 dark:bg-zinc-950/20">
                  {children}
                </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
    </>
  );
}

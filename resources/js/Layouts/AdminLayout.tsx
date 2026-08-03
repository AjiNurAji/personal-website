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
import { ThemeToggle } from "@/Components/UI/theme-toggle";
import { useTranslation } from "@/lib/i18n";

import { PreviewModal } from "@/Components/Dashboard/PreviewModal";

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
  const { t } = useTranslation();

  return (
    <>
        <Head title={title} />
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{t(title)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PreviewModal />
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
                  {children}
                </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
    </>
  );
}

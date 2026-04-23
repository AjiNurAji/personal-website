"use client";

import * as React from "react";
import {
  RiLayoutLine,
  RiFolder2Line,
  RiToolsLine,
  RiAwardLine,
  RiBriefcaseLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/UI/sidebar";
import { Link, usePage } from "@inertiajs/react";

const navItems = [
  {
    title: "Dashboard",
    url: route('admin.dashboard'),
    icon: RiLayoutLine,
    // nama komponen Inertia yang di-render untuk halaman ini
    component: "Admin/Dashboard",
  },
  {
    title: "Projects",
    url: route('admin.projects.index'),
    icon: RiFolder2Line,
    component: "Admin/Projects/Index",
  },
  {
    title: "Skills",
    url: route('admin.skills.index'),
    icon: RiToolsLine,
    component: "Admin/Skills/Index",
  },
  {
    title: "Achievements",
    url: route('admin.achievements.index'),
    icon: RiAwardLine,
    component: "Admin/Achievements/Index",
  },
  {
    title: "Experience",
    url: route('admin.experiences.index'),
    icon: RiBriefcaseLine,
    component: "Admin/Experiences/Index",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // `component` adalah nama file page Inertia yang sedang aktif
  const {url} = usePage();


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
            <RiLayoutLine className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold">Portfolio Admin</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={checkIsActive(item.url, url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Link href={route('logout')} method="post" as="button">
                <RiLogoutBoxLine />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function checkIsActive(url: string, currentUrl: string) {
  const splitUrl = url.split("/")
  const splitCurrentUrl = currentUrl.split("/")

  return splitUrl[splitUrl.length - 1] === splitCurrentUrl[splitCurrentUrl.length - 1];
}
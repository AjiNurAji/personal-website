"use client";

import * as React from "react";
import {
	RiLayoutLine,

	RiFolder2Line,
	RiToolsLine,
	RiAwardLine,
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
} from "~/components/ui/sidebar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: RiLayoutLine,

		},
		{
			title: "Projects",
			url: "/dashboard/projects",
			icon: RiFolder2Line,
		},
		{
			title: "Skills",
			url: "/dashboard/skills",
			icon: RiToolsLine,
		},
		{
			title: "Achievements",
			url: "/dashboard/achievements",
			icon: RiAwardLine,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

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
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url}
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
							onClick={() => signOut({ callbackUrl: "/login" })}
							className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
						>
							<RiLogoutBoxLine />
							<span>Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Project, User } from '@prisma/client';
import React from 'react';
import NavMain from './nav-main';
import { NavItems } from '@/lib/constant';
import RecentOpen from './recent-open';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    recentProjects: Project[];
    user?: User;
}

export default function AppSidebar({
    recentProjects,
    ...props
}: AppSidebarProps) {
    return (
        <Sidebar
            collapsible="icon"
            {...props}
            className="max-w-52 bg-background"
        >
            <SidebarHeader className=" pt-6 px-3 pb-0">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                        |
                        <Avatar className="rounded-full size-10">
                            <AvatarImage src={'/logo.png'} />
                            <AvatarFallback className="rounded-lg">
                                PPT
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="truncate text-primary font-semibold text-3xl">
                        PPT
                    </span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="gap-6 mt-10 px-3">
                <NavMain items={NavItems} />
                <RecentOpen recentProjects={recentProjects} />
            </SidebarContent>
        </Sidebar>
    );
}

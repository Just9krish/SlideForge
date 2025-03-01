'use client';

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavItems } from '@/lib/constant';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavMain({ items }: { items: typeof NavItems }) {
    const pathname = usePathname();

    return (
        <SidebarGroup className="p-0">
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            tooltip={item.title}
                            className={`${pathname.includes(item.url) ? 'bg-muted' : ''}`}
                        >
                            <Link
                                href={item.url}
                                className={cn(
                                    'text-lg',
                                    pathname.includes(item.url)
                                        ? 'font-bold'
                                        : ''
                                )}
                            >
                                <item.icon className="text-lg" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

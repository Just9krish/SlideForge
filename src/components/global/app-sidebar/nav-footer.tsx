'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { createFullName, createFullNameWithInitials } from '@/lib/utils';
import { User } from '@prisma/client';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';

export default function NavFooter({ user }: { user: User }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        console.log('object');
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex flex-col gap-6 items-start group-data-[collapsible=icon]:hidden">
                    {!user.subscription && (
                        <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background/80 rounded-xl">
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-base font-bold">
                                    Get{' '}
                                    <span className="primary-text">
                                        Creative AI
                                    </span>
                                </p>
                                <span className="text-sm dark:text-muted-foreground">
                                    Unlock all the feature including AI and more
                                </span>
                            </div>
                            <div className="w-full bg-site-gradient p-[1px] rounded-full">
                                <Button
                                    className="w-full bg-background hover:bg-background/90 text-primary rounded-full font-bold"
                                    onClick={handleSubscribe}
                                >
                                    {isLoading
                                        ? 'Loading...'
                                        : 'Subgscribe Now'}
                                </Button>
                            </div>
                        </div>
                    )}

                    <SidebarMenuButton
                        size={'lg'}
                        className="data-[state=open]:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                    >
                        <Avatar>
                            <AvatarImage src={user.profileImg || ''} />
                            <AvatarFallback>
                                {createFullNameWithInitials(
                                    user.firstName,
                                    user.lastName
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div className=" grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="truncate font-semibold">
                                {createFullName(user.firstName, user.lastName)}
                            </span>
                            <span className="truncate text-muted-foreground">
                                {user.email}
                            </span>
                        </div>
                    </SidebarMenuButton>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

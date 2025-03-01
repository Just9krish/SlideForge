import { Button } from '@/components/ui/button';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Project } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { toast } from 'sonner';

interface RecentOpenProps {
    recentProjects: Project[];
}

export default function RecentOpen({ recentProjects }: RecentOpenProps) {
    const handleClick = ({
        projectId,
        slides,
    }: {
        projectId: string;
        slides: JsonValue;
    }) => {
        if (!projectId || !slides) {
            return toast.error('Project not found');
        }
    };

    if (recentProjects.length === 0) {
        return null;
    }
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
            <SidebarMenu>
                {recentProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                        <SidebarMenuButton
                            asChild
                            tooltip={project.title}
                            className="hover:bg-primary/80"
                        >
                            <Button
                                variant="link"
                                className="text-xs items-center justify-start"
                                onClick={() =>
                                    handleClick({
                                        projectId: project.id,
                                        slides: project.slides,
                                    })
                                }
                            >
                                <span>{project.title}</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

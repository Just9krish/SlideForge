import { getRecentProjects } from '@/actions/projects.action';
import AppSidebar from '@/components/global/app-sidebar';
import Topbar from '@/components/global/top-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const recentProjects = await getRecentProjects();

    return (
        <SidebarProvider>
            <AppSidebar recentProjects={recentProjects.data || []} />
            <SidebarInset>
                <div className="p-4 space-y-6">
                    <Topbar />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

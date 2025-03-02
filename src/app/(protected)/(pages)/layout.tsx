import { getRecentProjects } from '@/actions/projects.action';
import { auth } from '@/auth';
import AppSidebar from '@/components/global/app-sidebar';
import Topbar from '@/components/global/top-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || !session.user) {
        return redirect('/login');
    }

    const recentProjects = await getRecentProjects();

    return (
        <SidebarProvider>
            <AppSidebar
                user={session.user}
                recentProjects={recentProjects.data || []}
            />
            <SidebarInset>
                <Topbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}

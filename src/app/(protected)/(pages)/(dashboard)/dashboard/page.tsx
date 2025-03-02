import { getAllProjects } from '@/actions/projects.action';
import Notfound from '@/components/global/not-found';
import ProjectCard from '@/components/global/project-card';
import Projects from '@/components/global/projects';

export default async function page() {
    const projects = await getAllProjects();
    return (
        <div className="w-full flex flex-col gap-6 relative md:p-0 p-4">
            <div className="flex items-center justify-between lg:flex-col-reverse lg:items-start w-full gap-6">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
                        Ptojects
                    </h1>
                    <p className="text-base font-normal text-muted-foreground">
                        All of your work in one place.
                    </p>
                </div>
            </div>
            <ProjectCard
                isDeleted={true}
                projectId="dd"
                title="Create new project"
                themeName="Default"
                createdAt={new Date()}
            />

            {projects.data?.length ? (
                <Projects projects={projects.data} />
            ) : (
                <Notfound
                    title="No projects found"
                    description="You don't have any projects yet. Create a new project to get started."
                />
            )}
        </div>
    );
}

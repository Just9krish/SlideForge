import { getAllProjects } from '@/actions/projects.action';

export default async function page() {
    const projects = await getAllProjects();
    return (
        <div className="w-full flex flex-col gap-6 relative">
            <div className="flex items-center justify-between lg:flex-col-reverse lg:items-start w-full gap-6">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
                        Ptojects
                    </h1>
                    <p className="text-base font-normal dark:text-secondary">
                        All of your work in one place.
                    </p>
                </div>
            </div>
        </div>
    );
}

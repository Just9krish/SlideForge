import { getProjectById } from "@/actions/projects.action";

export default async function Page({ params: { presentationId } }: { params: { presentationId: string; }; }) {
    try {
        const project = await getProjectById(presentationId);

        if (!project) {
            return <div>Project not found.</div>;
        }

        // Render the project details
        return (
            <div>
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                {/* Add more project details as needed */}
            </div>
        );
    } catch (error) {
        // Handle any errors that occurred during data fetching
        console.error("Error fetching project:", error);
        return <div>Failed to load project.</div>;
    }
}

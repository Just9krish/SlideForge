import { containerVariants } from '@/lib/variants';
import { Project } from '@prisma/client';
import { motion } from 'framer-motion';
import ProjectCard from '../project-card';

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project) => (
                <ProjectCard
                    themeName={project.themeName}
                    key={project.id}
                    projectId={project.id}
                    title={project.title}
                    isDeleted={project.isDeleted}
                    createdAt={project.createdAt}
                    slidesData={project.slides}
                />
            ))}
        </motion.div>
    );
}

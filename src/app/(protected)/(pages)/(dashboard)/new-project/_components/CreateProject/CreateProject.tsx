import { CREATE_PROJECT_CARD } from '@/lib/constant';
import { cn } from '@/lib/utils';
import { containerItemVariants, containerVariants } from '@/lib/variants';
import { motion } from 'framer-motion';

interface CreateProjectProps {
    onSelectOption: (option: string) => void;
}

export default function CreateProject({}: CreateProjectProps) {
    return (
        <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="text-center space-y-2"
                variants={containerItemVariants}
            >
                <h1 className="text-4xl font-bold text-primary">
                    How would you like to get started?
                </h1>
                <p className="text-secondary">
                    Choose your preferred method to begin
                </p>
            </motion.div>
            <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={containerItemVariants}
            >
                {CREATE_PROJECT_CARD.map((project) => (
                    <motion.div
                        key={project.type}
                        onClick={() => {}}
                        variants={containerItemVariants}
                        whileHover={{
                            scale: 1.05,
                            rotate: 1,
                            transition: { duration: 0.1 },
                        }}
                        className={cn(
                            'rounded-xl p-[1px] transition-all duration-300 ease-in-out',
                            project.highlight
                                ? 'bg-site-gradient'
                                : 'hover:border-purple-500 border'
                        )}
                    >
                        <h3 className="text-xl font-semibold text-primary">
                            Create a new project
                        </h3>
                        <p className="text-secondary">
                            Start a new project from scratch
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

import { Button } from '@/components/ui/button';
import { CREATE_PROJECT_CARD } from '@/lib/constant';
import { cn } from '@/lib/utils';
import { containerItemVariants, containerVariants } from '@/lib/variants';
import { motion } from 'framer-motion';

interface CreateProjectProps {
    onSelectOption: (option: string) => void;
}

export default function CreateProject({ onSelectOption }: CreateProjectProps) {
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
                <h1 className="text-4xl font-bold text-primary font-heading">
                    How would you like to get started?
                </h1>
                <p className="text-muted-foreground">
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
                                : 'border-gradient'
                        )}
                    >
                        <motion.div
                            className="w-full p-4 flex flex-col gap-6 items-start bg-background rounded-xl"
                            whileHover={{ transition: { duration: 0.1 } }}
                        >
                            <div className="flex flex-col items-start w-full gap-3">
                                <div>
                                    <p className="text-primary text-lg font-semibold">
                                        {project.title}
                                    </p>
                                    <p
                                        className={cn(
                                            'text-4xl font-bold font-heading',
                                            project.highlight
                                                ? 'primary-text'
                                                : 'text-primary'
                                        )}
                                    >
                                        {project.highlightedText}
                                    </p>
                                </div>
                                <p className="text-muted-foreground text-sm font-normal">
                                    {project.description}
                                </p>
                            </div>
                            <motion.div
                                className="self-end"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    transition: { duration: 0.1 },
                                }}
                            >
                                <Button
                                    variant={
                                        project.highlight
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className="w-fit rounded-xl font-bold"
                                    size={'sm'}
                                    onClick={() => onSelectOption(project.type)}
                                >
                                    {project.highlight
                                        ? 'Generate'
                                        : 'Continue'}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

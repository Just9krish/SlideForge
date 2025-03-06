import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import { containerItemVariants, containerVariants } from '@/lib/variants';
import useCreativeAiStore from '@/store/useCreativeAiStore';
import usePromptStore from '@/store/usePromptStore';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function RecentPrompt() {
    const { prompts, setPage } = usePromptStore();
    const { addMultipleOutlines, setCurrentAiPrompt } = useCreativeAiStore();

    const handleEdit = (promptId: string) => {
        const prompt = prompts.find((prompt) => prompt.id === promptId);
        if (prompt) {
            setPage('create-ai');
            addMultipleOutlines(prompt.outlines);
            setCurrentAiPrompt(prompt.title);
        } else {
            toast.error('Prompt not found');
        }
    };

    return (
        <motion.div variants={containerVariants} className="space-y-4 mt-20">
            <motion.h2
                variants={containerItemVariants}
                className="text-2xl font-semibold text-primary text-center"
            >
                Your Recent Prompts
            </motion.h2>

            <motion.div
                variants={containerItemVariants}
                className="space-y-2 w-full lg:max-w-[80%] mx-auto"
            >
                {prompts.map((prompt) => (
                    <motion.div
                        key={prompt.id}
                        variants={containerItemVariants}
                    >
                        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
                            <div className="max-w-[70%]">
                                <h3 className="font-semibold text-xl line-clamp-1">
                                    {prompt.title}
                                </h3>
                                <p>{timeAgo(prompt.createdAt)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm primary-text">
                                    Creative AI
                                </span>
                                <Button
                                    size={'sm'}
                                    onClick={() => handleEdit(prompt.id)}
                                    className="rounded-xl text-primary bg-primary/20 dark:hover:bg-gray-700 hover:bg-gray-200"
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

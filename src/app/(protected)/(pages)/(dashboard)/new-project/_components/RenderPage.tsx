'use client';

import usePromptStore from '@/store/usePromptStore';
import { AnimatePresence, motion } from 'framer-motion';
import CreateProject from './CreateProject/CreateProject';
import { useRouter } from 'next/navigation';
import CreateAI from './GenerateAI/CreateAI';
import CreateScratch from './Scratch/CreateScratch';

export default function RenderPage() {
    const { page, setPage } = usePromptStore();
    const router = useRouter();

    const handleCreateProject = () => {
        setPage('create');
    };

    const handleSelectOption = (option: string) => {
        console.log({ option });
        if (option === 'template') {
            router.push('/templates');
        } else if (option === 'create-scratch') {
            setPage('create-scratch');
        } else {
            setPage('create-ai');
        }
    };

    const renderStep = () => {
        switch (page) {
            case 'create':
                return <CreateProject onSelectOption={handleSelectOption} />;
            case 'create-ai':
                return <CreateAI onBack={handleCreateProject} />;
            case 'create-scratch':
                return <CreateScratch onBack={handleCreateProject} />;
            default:
                return <div>Default</div>;
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    );
}

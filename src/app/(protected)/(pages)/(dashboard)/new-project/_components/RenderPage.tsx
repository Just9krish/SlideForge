'use client';

import usePromptStore from '@/store/usePromptStore';
import { AnimatePresence, motion } from 'framer-motion';
import CreateProject from './CreateProject/CreateProject';

export default function RenderPage() {
    const { page } = usePromptStore();

    const renderStep = () => {
        switch (page) {
            case 'create':
                return <CreateProject />;
            case 'create-ai':
                return <div>Create AI</div>;
            case 'create-scratch':
                return <div>Create Scratch</div>;
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

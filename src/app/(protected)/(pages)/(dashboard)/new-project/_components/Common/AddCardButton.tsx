'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddCardButtonProps {
    onAddCard: () => void;
}

export default function AddCardButton({ onAddCard }: AddCardButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="w-full relative overflow-hidden"
            initial={{ height: '0.5rem' }}
            animate={{
                height: isHovered ? '2rem' : '0.5rem',
                transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        <div className="w-[40%] h-0.5 bg-primary"></div>
                        <Button
                            className="rounded-full size-8 bg-primary hover:bg-primary/80"
                            onClick={onAddCard}
                            size={'sm'}
                            variant={'outline'}
                            aria-label="Add a new card"
                        >
                            <Plus className="size-4 text-black" />
                        </Button>
                        <div className="w-[40%] h-0.5 bg-primary"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

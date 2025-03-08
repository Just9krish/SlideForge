import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { containerItemVariants, containerVariants } from '@/lib/variants';
import useScratchStore from '@/store/useScratchStore';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ScratchPageProps {
    onBack: () => void;
}

export default function CreateScratch({ onBack }: ScratchPageProps) {
    const { resetOutlines, outlines, addOutline, addMultipleOutlines } =
        useScratchStore();

    const [editText, setEditText] = useState('');

    const handleBack = () => {
        onBack();
        resetOutlines();
    };

    const resetCards = () => {
        resetOutlines();
        setEditText('');
    };

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={handleBack}
                variant={'outline'}
                className="mb-4 gap-2   "
            >
                <ChevronLeft className="size-4" />
                Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary text-left">
                Prompt
            </h1>
            <motion.div
                className="bg-primary/10 p-4  rounded-xl"
                variants={containerItemVariants}
            >
                <div className="flex flex-col md:flex-row justify-between gap-3 items-center rounded-xl">
                    <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full text-base md:text-xl border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-0 bg-transparent flex-grow"
                    />
                    <div className="flex items-center gap-3">
                        <Select
                            value={
                                outlines.length > 0
                                    ? outlines.length.toString()
                                    : '0'
                            }
                        >
                            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                <SelectValue placeholder="Select number of cards" />
                            </SelectTrigger>
                            <SelectContent className="w-fit">
                                {Array.from(
                                    { length: outlines.length },
                                    (_, i) => i + 1
                                ).map((number) => (
                                    <SelectItem
                                        className="font-semibold"
                                        key={number}
                                        value={number.toString()}
                                    >
                                        {number}{' '}
                                        {number === 1 ? 'card' : 'cards'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant={'destructive'}
                            size={'icon'}
                            onClick={resetCards}
                            aria-label="reset cards"
                        >
                            <RotateCcw className="size-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

import LoadingButton from '@/components/global/LoadingButton';
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
import useCreativeAiStore from '@/store/useCreativeAiStore';
import { motion } from 'framer-motion';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardList from '../Common/CardList';
import usePromptStore from '@/store/usePromptStore';
import RecentPrompt from './RecentPrompt';
import { toast } from 'sonner';

interface CreateAIProps {
    onBack: () => void;
}
export default function CreateAI({ onBack }: CreateAIProps) {
    const {
        currentAiPrompt,
        setCurrentAiPrompt,
        outlines,
        removeAllOutlines,
        addOutline,
        addMultipleOutlines,
    } = useCreativeAiStore();

    const { prompts } = usePromptStore();

    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [numberOfCards, setNumberOfCards] = useState(0);
    const [editText, setEditText] = useState('');

    const resetCards = () => {
        setSelectedCard(null);
        setEditingCard(null);
        setEditText('');
        setCurrentAiPrompt('');
        removeAllOutlines();
    };

    // WIP: Add generate online
    const generateOnline = async () => {
        console.log('object');
        if (!currentAiPrompt) {
            toast.info('Please enter a prompt to generate outline.');
            return;
        }

        setIsGenerating(true);

        // WIP: use open ai and complet it.
    };

    // WIP: const handleGenerate = async () => {}

    useEffect(() => {
        setNumberOfCards(outlines.length);
    }, [outlines.length]);

    return (
        <motion.div
            className="space-y-6 w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Button className="mb-4 gap-2" variant={'outline'} onClick={onBack}>
                <ChevronLeft className="size-4" /> Back
            </Button>
            <motion.div
                variants={containerItemVariants}
                className="space-y-2 text-center"
            >
                <h1 className="text-4xl font-bold text-primary font-heading">
                    Generate with{' '}
                    <span className="primary-text">Creative AI</span>
                </h1>
                <p className="text-muted-foreground">
                    What would you like to create today?
                </p>
                <motion.div
                    className="bg-primary/20 p-4 rounded-xl"
                    variants={containerItemVariants}
                >
                    <div className="flex items-center flex-col md:flex-row justify-between gap-3 rounded-xl">
                        <Input
                            value={currentAiPrompt || ''}
                            onChange={(e) => setCurrentAiPrompt(e.target.value)}
                            placeholder="Enter prompts and add to cards"
                            className="shadow-none text-base md:text-xl border-0 focus-visible:ring-0 bg-transparent p-0 flex-grow"
                        />
                        {outlines.length > 0 && (
                            <div className="flex items-center gap-3">
                                <Select
                                    value={numberOfCards.toString()}
                                    onValueChange={(value) =>
                                        setNumberOfCards(parseInt(value))
                                    }
                                >
                                    <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                        <SelectValue placeholder="Select number of cards" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                                {number === 1
                                                    ? 'card'
                                                    : 'cards'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant={'destructive'}
                                    size={'icon'}
                                    aria-label="Reset cards"
                                    onClick={resetCards}
                                >
                                    <RotateCcw className="size-4" />
                                    <span className="sr-only">Reset cards</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
            <div className="w-full flex justify-center items-center">
                <LoadingButton
                    loading={isGenerating}
                    className="text-lg font-medium"
                >
                    {isGenerating ? 'Generating...' : 'Generate Outline'}
                </LoadingButton>
            </div>
            <CardList
                outlines={outlines}
                addOutline={addOutline}
                addMultipleOutlines={addMultipleOutlines}
                editText={editText}
                editingCard={editingCard}
                selectedCard={selectedCard}
                onCardSelect={setSelectedCard}
                onEditChange={setEditText}
                setEditText={setEditText}
                setEditingCard={setEditingCard}
                setSelectedCard={setSelectedCard}
                onCardDoubleClick={(cardId, title) => {
                    setEditingCard(cardId);
                    setEditText(title);
                }}
            />

            {outlines.length > 0 && (
                <LoadingButton
                    loading={isGenerating}
                    onClick={generateOnline}
                    className="w-full"
                >
                    {isGenerating ? 'Generating...' : 'Generate'}
                </LoadingButton>
            )}

            {prompts.length > 0 && <RecentPrompt />}
        </motion.div>
    );
}

import { OutlineCard } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import React, { DragEvent, useState } from 'react';
import Card from './Card';

interface CardListProps {
    outlines: OutlineCard[];
    editingCard: string | null;
    selectedCard: string | null;
    editText: string;
    addOutline: (card: OutlineCard) => void;
    onEditChange: (text: string) => void;
    onCardSelect: (cardId: string) => void;
    onCardDoubleClick: (cardId: string, title: string) => void;
    setEditText: (text: string) => void;
    setEditingCard: (cardId: string | null) => void;
    setSelectedCard: (cardId: string | null) => void;
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
}
export default function CardList({
    addMultipleOutlines,
    addOutline,
    editText,
    editingCard,
    onCardDoubleClick,
    onCardSelect,
    onEditChange,
    outlines,
    selectedCard,
    setEditText,
    setEditingCard,
    setSelectedCard,
}: CardListProps) {
    const [draggedItem, setDraggedItem] = useState<OutlineCard | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (
            outlines.length === 0 ||
            e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
            if (!draggedItem) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const threshold = rect.height / 2;

            if (y > threshold) {
                setDragOverIndex(outlines.length);
            } else {
                setDragOverIndex(outlines.length - 1);
            }
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!draggedItem || !dragOverIndex) return;

        const newOutlines = [...outlines];

        const draggedItemIndex = newOutlines.findIndex(
            (item) => item.id === draggedItem.id
        );

        if (draggedItemIndex === -1 || draggedItemIndex === dragOverIndex)
            return;

        const [removedCard] = newOutlines.splice(draggedItemIndex, 1);
        newOutlines.splice(
            dragOverIndex > draggedItemIndex
                ? dragOverIndex - 1
                : dragOverIndex,
            0,
            removedCard
        );
        addMultipleOutlines(
            newOutlines.map((item, i) => ({ ...item, order: i }))
        );

        setDraggedItem(null);
        setDragOverIndex(null);
    };

    return (
        <motion.div
            className="space-y-2 -my-2"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <AnimatePresence>
                {outlines.map((card) => (
                    <React.Fragment key={card.id}>
                        <Card />
                    </React.Fragment>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

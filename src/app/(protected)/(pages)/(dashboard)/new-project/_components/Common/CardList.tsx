import { OutlineCard } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import React, { DragEvent, useRef, useState } from 'react';
import Card from './Card';
import AddCardButton from './AddCardButton';

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
    const dragOffSetY = useRef(0);

    const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const threshold = rect.height / 2;

        if (y < threshold) {
            setDragOverIndex(index);
        } else {
            setDragOverIndex(index + 1);
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

    const onCardUpdates = (cardId: string, title: string) => {
        addMultipleOutlines(
            outlines.map((item) =>
                item.id === cardId ? { ...item, title } : item
            )
        );
        setEditingCard(null);
        setSelectedCard(null);
        setEditText('');
    };

    const onCardDelete = (cardId: string) => {
        addMultipleOutlines(
            outlines
                .filter((item) => item.id !== cardId)
                .map((item, i) => ({ ...item, order: i + 1 }))
        );
    };

    const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
        setDraggedItem(card);
        e.dataTransfer.effectAllowed = 'move';

        const rect = e.currentTarget.getBoundingClientRect();

        dragOffSetY.current = e.clientY - rect.top;

        const draggedElem = e.currentTarget.cloneNode(true) as HTMLElement;

        draggedElem.style.position = 'absolute';
        draggedElem.style.opacity = '0.7';
        draggedElem.style.top = '-1000px';
        draggedElem.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
        document.body.appendChild(draggedElem);
        e.dataTransfer.setDragImage(draggedElem, 0, dragOffSetY.current);

        setTimeout(() => {
            setDragOverIndex(outlines.findIndex((item) => item.id === card.id));
            document.body.removeChild(draggedElem);
        }, 0);
    };

    const onDragEnd = (e) => {
        e.preventDefault();
        setDraggedItem(null);
        setDragOverIndex(null);
    };

    const getDragOverStyles = (index: number) => {
        if (dragOverIndex === null || draggedItem === null) {
            return {};
        }
        if (dragOverIndex === index) {
            return {
                borderTop: '2px solid #000',
                marginTop: '0.5rem',
                transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            };
        } else if (dragOverIndex === index - 1) {
            return {
                borderBottom: '2px solid #000',
                marginBottom: '0.5rem',
                transition: 'margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
            };
        } else {
            return {};
        }
    };

    const onAddCard = (index: number) => {};

    return (
        <motion.div
            className="space-y-2 -my-2"
            onDragOver={(e) => {
                e.preventDefault();
                if (
                    outlines.length === 0 ||
                    e.clientY >
                        e.currentTarget.getBoundingClientRect().bottom - 20
                ) {
                    handleDragOver(e, outlines.length);
                }
            }}
            onDrop={(e) => {
                e.preventDefault();
                handleDrop(e);
            }}
        >
            <AnimatePresence>
                {outlines.map((card, index) => (
                    <React.Fragment key={card.id}>
                        <Card
                            onDragOver={(e) => handleDragOver(e, index)}
                            card={card}
                            isEditing={editingCard === card.id}
                            isSelected={selectedCard === card.id}
                            editText={editText}
                            onEditChange={onEditChange}
                            onEditBlur={() => onCardUpdates(card.id, editText)}
                            onEditKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    onCardUpdates(card.id, editText);
                                }
                            }}
                            onCardClick={() => onCardSelect(card.id)}
                            onCardDoubleClick={() =>
                                onCardDoubleClick(card.id, card.title)
                            }
                            onDeleteClick={() => onCardDelete(card.id)}
                            dragHandler={{
                                onDragStart: (e) => onDragStart(e, card),
                                onDragEnd: onDragEnd,
                            }}
                            dragOverStyles={getDragOverStyles(index)}
                        />
                        <AddCardButton onAddCard={() => onAddCard(index)} />
                    </React.Fragment>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

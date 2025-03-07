'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { OutlineCard } from '@/lib/types';
import { Card as UICard } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface CardProps {
    card: OutlineCard;
    isEditing: boolean;
    isSelected: boolean;
    editText: string;
    onEditChange: (text: string) => void;
    onEditBlur: () => void;
    onEditKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onCardClick: () => void;
    onCardDoubleClick: () => void;
    onDeleteClick: () => void;
    dragHandler: {
        onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
        onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
        onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
    };
    dragOverStyles: React.CSSProperties;
}
export default function Card({
    card,
    editText,
    isEditing,
    isSelected,
    onEditBlur,
    onEditChange,
    onEditKeyDown,
    dragHandler,
    dragOverStyles,
    onCardClick,
    onCardDoubleClick,
    onDeleteClick,
}: CardProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 1,
            }}
            className="relative"
        >
            <div draggable style={dragOverStyles} {...dragHandler}>
                <UICard
                    className={cn(
                        'p-4 cursor-grab active:cursor-grabbing',
                        isEditing || isSelected
                            ? 'border-primary bg-transparent'
                            : 'bg-primary/90'
                    )}
                    onClick={onCardClick}
                    onDoubleClick={onCardDoubleClick}
                >
                    <div className="flex items-center justify-between">
                        {isEditing ? (
                            <Input
                                className="text-base md:text-lg py-1 px-4 rounded-xl"
                                type="text"
                                ref={inputRef}
                                value={editText}
                                onChange={(e) => onEditChange(e.target.value)}
                                onBlur={onEditBlur}
                                onKeyDown={onEditKeyDown}
                            />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        'text-base md:text-lg py-1 px-4 rounded-xl',
                                        isEditing || isSelected
                                            ? 'bg-muted/90 dark:text-black'
                                            : 'bg-primary/20'
                                    )}
                                >
                                    {card.order}
                                </span>
                                <span className="text-base md:text-lg">
                                    {card.title}
                                </span>
                            </div>
                        )}

                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteClick();
                            }}
                            area-label={`Delete  card ${card.order}`}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </UICard>
            </div>
        </motion.div>
    );
}

import { OutlineCard } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreativeAiStore {
    outlines: OutlineCard[] | [];
    currentAiPrompt: string | '';
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
    addOutline: (outline: OutlineCard) => void;
    removeOutline: (outlineId: string) => void;
    removeAllOutlines: () => void;
    setCurrentAiPrompt: (prompt: string) => void;
}

const useCreativeAiStore = create<CreativeAiStore>()(
    persist(
        (set) => ({
            outlines: [],
            currentAiPrompt: '',
            addMultipleOutlines: (outlines: OutlineCard[]) =>
                set((state) => ({
                    outlines: [...outlines, ...state.outlines],
                })),
            addOutline: (outline: OutlineCard) =>
                set((state) => ({
                    outlines: [outline, ...state.outlines],
                })),
            removeOutline: (outlineId: string) =>
                set((state) => ({
                    outlines: state.outlines.filter(
                        (outline) => outline.id !== outlineId
                    ),
                })),
            removeAllOutlines: () =>
                set(() => ({
                    outlines: [],
                })),
            setCurrentAiPrompt: (prompt: string) =>
                set({ currentAiPrompt: prompt }),
        }),
        {
            name: 'creative-ai-store',
        }
    )
);

export default useCreativeAiStore;

import { OutlineCard } from '@/lib/types';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface ScratchState {
    outlines: OutlineCard[];
    addOutline: (outline: OutlineCard) => void;
    addMultipleOutlines: (outlines: OutlineCard[]) => void;
    resetOutlines: () => void;
}

const useScratchStore = create<ScratchState>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                addOutline: (outline: OutlineCard) =>
                    set((state) => ({
                        outlines: [outline, ...state.outlines],
                    })),
                addMultipleOutlines: (outlines: OutlineCard[]) =>
                    set(() => ({
                        outlines: [...outlines],
                    })),
                resetOutlines: () => set({ outlines: [] }),
            }),
            {
                name: 'scratch-store',
            }
        )
    )
);

export default useScratchStore;

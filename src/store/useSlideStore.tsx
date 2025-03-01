import { Slide } from '@/lib/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[];
    setSlides: (slide: Slide[]) => void;
}

export const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            setSlides: (slides: Slide[]) => set({ slides }),
        }),
        { name: 'slides-storage' }
    )
);

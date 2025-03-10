import { Slide } from '@/lib/types';
import { Project } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[];
    project: Project | null;
    setSlides: (slide: Slide[]) => void;
    setProject: (project: Project) => void;
}

const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            project: null,
            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project) => set({ project }),
        }),
        { name: 'slides-storage' }
    )
);

export default useSlideStore;

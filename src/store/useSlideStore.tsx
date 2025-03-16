import { Themes } from '@/lib/constant';
import { Slide, Theme } from '@/lib/types';
import { Project } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SlideState {
    slides: Slide[];
    project: Project | null;
    setSlides: (slide: Slide[]) => void;
    setProject: (project: Project) => void;
    currentTheme: Theme;
    setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme = Themes[0];

const useSlideStore = create(
    persist<SlideState>(
        (set) => ({
            slides: [],
            project: null,
            setSlides: (slides: Slide[]) => set({ slides }),
            setProject: (project: Project) => set({ project }),
            currentTheme: defaultTheme,
            setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
        }),
        { name: 'slides-storage' }
    )
);

export default useSlideStore;

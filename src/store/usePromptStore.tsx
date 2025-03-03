import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type Page = 'create' | 'create-ai' | 'create-scratch';

type PromptStore = {
    page: Page;
    setPage: (page: Page) => void;
};

const usePromptStore = create<PromptStore>()(
    devtools(
        persist(
            (set) => ({
                page: 'create',
                setPage: (page: Page) => set({ page }),
            }),
            {
                name: 'prompt-store',
            }
        )
    )
);

export default usePromptStore;

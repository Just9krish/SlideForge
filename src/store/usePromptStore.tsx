import { Prompt } from '@/lib/types';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type Page = 'create' | 'create-ai' | 'create-scratch';

type PromptStore = {
    page: Page;
    setPage: (page: Page) => void;
    prompts: Prompt[] | [];
    addPrompt: (prompt: Prompt) => void;
    removePrompt: (promptId: string) => void;
};

const usePromptStore = create<PromptStore>()(
    devtools(
        persist(
            (set) => ({
                page: 'create',
                setPage: (page: Page) => set({ page }),
                prompts: [],
                addPrompt: (prompt: Prompt) =>
                    set((state) => ({
                        prompts: [prompt, ...state.prompts],
                    })),
                removePrompt: (promptId: string) =>
                    set((state) => ({
                        prompts: state.prompts.filter(
                            (prompt) => prompt.id !== promptId
                        ),
                    })),
                clearPrompts: () => set({ prompts: [] }),
            }),
            {
                name: 'prompt-store',
            }
        )
    )
);

export default usePromptStore;

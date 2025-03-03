'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NewProjectButton() {
    const session = useSession();
    const router = useRouter();

    const handleNewProject = () => {
        router.push('/new-project');
    };

    return (
        <Button
            size={'lg'}
            className="rounded-lg font-semibold"
            disabled={!session.data?.user?.subscription}
            onClick={handleNewProject}
        >
            <Plus />
            <span>New Project</span>
        </Button>
    );
}

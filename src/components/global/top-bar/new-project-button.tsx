'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function NewProjectButton() {
    const session = useSession();

    return (
        <Button
            size={'lg'}
            className="rounded-lg font-semibold"
            disabled={!session.data?.user?.subscription}
        >
            <Plus />
            <span>New Project</span>
        </Button>
    );
}

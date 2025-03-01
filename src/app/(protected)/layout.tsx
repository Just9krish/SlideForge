import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    return <div className="w-full min-h-screen">{children}</div>;
}

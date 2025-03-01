import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={`m-auto my-10 max-w-5xl space-y-5 px-3 ${inter.className}`}>
            {children}
            <Toaster />
        </main>
    );
}

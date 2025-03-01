import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { ThemeProvider } from '@/providers/themeProvider';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';

export const metadata: Metadata = {
    title: 'PPT Creator',
    description: 'Create a PPT easily',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html suppressHydrationWarning lang="en">
                <body className={`antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors closeButton />
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}

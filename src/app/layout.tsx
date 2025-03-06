import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { ThemeProvider } from '@/providers/themeProvider';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';
import AlertDialogComponent from '@/components/global/alert-dialog/AlertDialog';
import { Roboto, Montserrat } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-montserrat',
});

export const metadata: Metadata = {
    title: 'Slide Forge',
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
                <body
                    className={`antialiased ${roboto.variable} ${montserrat.variable} font-body`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster richColors closeButton />
                        <AlertDialogComponent />
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}

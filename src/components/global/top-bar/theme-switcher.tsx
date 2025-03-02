'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            className="relative inline-flex items-center p-1 rounded-full bg-muted border shadow-sm hover:bg-muted"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {/* Active indicator */}
            <div
                className={`absolute transition-all items-center justify-center duration-300 bg-background ${
                    theme === 'light' ? 'left-0' : 'left-full -translate-x-full'
                } w-1/2 h-8 rounded-full`}
            />

            <div className="relative z-10 flex items-center gap-4 px-2">
                <Sun
                    className={`h-5 w-5 transition-colors ${
                        theme === 'light'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    }`}
                />

                <Moon
                    className={`h-5 w-5 transition-colors ${
                        theme === 'dark'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                    }`}
                />
            </div>
        </Button>
    );
}

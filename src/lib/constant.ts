import { Home, Share2, Grid3X3, Trash2, Settings } from 'lucide-react';

// Verification toke expiration time is 1 hour
export const TOKEN_EXPIRATION_TIME = 60 * 60;

export const SALT = 10;

export const NavItems = [
    {
        title: 'Home',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Templates',
        url: '/templates',
        icon: Grid3X3,
    },
    {
        title: 'Share',
        url: '/share',
        icon: Share2,
    },
    {
        title: 'Trash',
        url: '/trash',
        icon: Trash2,
    },
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
    },
];

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createFullName(firstname: string, lastname: string) {
    return `${firstname} ${lastname}`;
}

export function createFullNameWithInitials(
    firstname: string,
    lastname: string
) {
    return `${firstname[0]}${lastname[0]}`;
}

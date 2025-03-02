import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { INTERVALS } from '@/lib/constant';

/**
 * A utility function that merges multiple class names into one.
 * It takes in one or more class names as strings or arrays of strings,
 * and returns a single class name that is the result of merging all of them.
 * @param {...ClassValue[]} inputs - One or more class names as strings or arrays of strings.
 * @returns {string} - A single class name that is the result of merging all of the inputs.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Creates a full name from the given first name and last name.
 * @param {string} firstname - The first name.
 * @param {string} lastname - The last name.
 * @returns {string} The full name.
 */
export function createFullName(firstname: string, lastname: string): string {
    return `${firstname} ${lastname}`;
}

export function createFullNameWithInitials(
    firstname: string,
    lastname: string
) {
    return `${firstname[0]}${lastname[0]}`;
}

/**
 * Calculates the time difference between now and the given date.
 * @param {string|Date} date - The date to calculate the time difference from.
 * @returns {string} A string indicating the time difference, for example "1 minute ago".
 */
export function timeAgo(date: string | Date): string {
    if (typeof date === 'string') {
        // If the date is a string, convert it to a Date object.
        date = new Date(date);
    }

    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let counter = '';
    INTERVALS.forEach((interval) => {
        const value = Math.floor(seconds / interval.value);
        if (value > 0) {
            // If the value is greater than 0, then we have a match.
            counter = `${value} ${interval.label}${value > 1 ? 's' : ''} ago`;
        } else {
            // If the value is 0, then we don't have a match.
            counter = 'Just now';
        }
    });

    return counter;
}

import prisma from '@/lib/prisma';

/**
 * Retrieves the two-factor confirmation record for a given user ID.
 *
 * @param userId - The unique identifier of the user.
 * @returns The two-factor confirmation object if found, otherwise null.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        // Attempt to find the two-factor confirmation associated with the user ID
        const twoFactorConfirmation =
            await prisma.twoFactorConfirmation.findUnique({
                where: {
                    userId,
                },
            });

        // Return the two-factor confirmation if found
        return twoFactorConfirmation;
    } catch {
        // Return null if an error occurs
        return null;
    }
};

/**
 * Deletes the two-factor confirmation record for a given user ID.
 *
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to void or null if an error occurs.
 */
export const deleteTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        // Attempt to delete the two-factor confirmation associated with the user ID
        await prisma.twoFactorConfirmation.delete({
            where: {
                userId,
            },
        });
    } catch {
        // Return null if an error occurs during the deletion process
        return null;
    }
};

/**
 * Deletes the two-factor confirmation record for a given confirmation ID.
 *
 * @param id - The unique identifier of the two-factor confirmation record.
 * @returns A promise that resolves to void or null if an error occurs.
 */
export const deleteTwoFactorConfirmationById = async (id: string) => {
    try {
        // Attempt to delete the two-factor confirmation associated with the given ID
        await prisma.twoFactorConfirmation.delete({
            where: {
                id,
            },
        });
    } catch {
        // Return null if an error occurs during the deletion process
        return null;
    }
};

/**
 * Creates a two-factor confirmation record for a given user ID.
 *
 * @param userId - The unique identifier of the user.
 * @returns A promise that resolves to the created two-factor confirmation object, or null if an error occurs.
 */
export const createTwoFactorConfirmation = async (userId: string) => {
    try {
        // Attempt to create a new two-factor confirmation record associated with the user ID
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.create(
            {
                data: {
                    userId,
                },
            }
        );

        // Return the created two-factor confirmation object
        return twoFactorConfirmation;
    } catch {
        // Return null if an error occurs during the creation process
        return null;
    }
};

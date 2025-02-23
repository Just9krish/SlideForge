import prisma from '@/lib/prisma'

/**
 * Fetches a user from the database using their email address.
 *
 * @param email - The email address of the user.
 * @returns The user object if found, otherwise null.
 */
export async function getUserByEmail(email: string) {
    try {
        // Attempt to find the user in the database by email
        const user = prisma.user.findUnique({
            where: {
                email,
            },
        })

        // Return the user object if found
        return user
    } catch {
        // Return null if an error occurs during the process
        return null
    }
}

/**
 * Fetches a user from the database using their unique ID.
 *
 * @param id - The unique identifier of the user.
 * @returns The user object if found, otherwise null.
 */
export async function getUserById(id: string) {
    try {
        // Attempt to find the user in the database by ID
        const user = prisma.user.findUnique({
            where: {
                id,
            },
        })

        // Return the user object if found
        return user
    } catch {
        // Return null if an error occurs during the process
        return null
    }
}

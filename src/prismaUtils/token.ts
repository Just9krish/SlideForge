import prisma from '@/lib/prisma';

/**
 * Retrieves the verification token associated with the given email.
 *
 * @param email - The email address to search for.
 * @returns The verification token object if found, or null if not found or an error occurred.
 */
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                email,
            },
        });

        return verificationToken;
    } catch {
        return null;
    }
};

/**
 * Retrieves a verification token by its token value.
 *
 * @param {string} token - The token value of the verification token.
 * @returns {Promise<object|null>} - A promise that resolves to the verification token object if found, or null if not found.
 */
export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                vToken: token,
            },
        });

        return verificationToken;
    } catch {
        return null;
    }
};

/**
 * Retrieves a reset password token by its token value.
 *
 * @param {string} token - The token value of the reset password token.
 * @returns {Promise<object|null>} - A promise that resolves to the reset password token object if found, or null if not found.
 */
export const getResetPasswordTokenByToken = async (token: string) => {
    try {
        const resetToken = await prisma.resetPasswordToken.findUnique({
            where: { rToken: token },
        });

        return resetToken;
    } catch {
        return null;
    }
};

/**
 * Retrieves the reset password token for a given email.
 *
 * @param email - The email address to retrieve the reset password token for.
 * @returns The reset password token if found, otherwise null.
 */
export const getResetPasswordTokenByEmail = async (email: string) => {
    try {
        const resetToken = await prisma.resetPasswordToken.findFirst({
            where: { email },
        });

        return resetToken;
    } catch {
        return null;
    }
};

/**
 * Retrieves the two-factor authentication token for a given email address.
 *
 * @param email - The email address to search for.
 * @returns The two-factor authentication token object if found, otherwise null.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        // Attempt to find the two-factor token associated with the email
        const token = await prisma.twoFactorToken.findFirst({
            where: {
                email,
            },
        });

        // Return the token if found
        return token;
    } catch {
        // Return null if an error occurs
        return null;
    }
};

/**
 * Retrieves a two factor token by its token value.
 *
 * @param token - The token value of the two factor token.
 * @returns The two factor token object if found, otherwise null.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const exisitingToken = await prisma.twoFactorToken.findFirst({
            where: {
                token,
            },
        });

        return exisitingToken;
    } catch {
        return null;
    }
};

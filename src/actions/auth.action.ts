'use server';

import {
    generateResetToken,
    generateTwoFactorToken,
    generateVerificationToken,
} from '@/lib/token';
import { getUserByEmail } from '@/prismaUtils/user';
import {
    loginSchema,
    LoginInput,
    registerSchema,
    RegisterInput,
    newPasswordSchema,
    NewPasswordInput,
    forgotPasswordSchema,
    ForgotPasswordInput,
} from '@/schema/auth.schema';
import { signIn, signOut } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { SALT } from '@/lib/constant';
import {
    getResetPasswordTokenByToken,
    getTwoFactorTokenByEmail,
    getVerificationTokenByToken,
} from '@/prismaUtils/token';
import { isBefore } from 'date-fns';
import {
    createTwoFactorConfirmation,
    deleteTwoFactorConfirmationById,
    getTwoFactorConfirmationByUserId,
} from '@/prismaUtils/twoFactorConfirmation';
import prisma from '@/lib/prisma';

/**
 * Logs in the user by calling the signIn function.
 *
 * @param {LoginInput} payload - The payload to validate and use for login.
 * @returns {Promise<{ success: string } | { error: string } | { twoAuth: boolean }>} A promise that resolves to an object containing either a "success" property, an "error" property, or a "twoAuth" property.
 */
export async function login(
    payload: LoginInput
): Promise<{ success: string; } | { error: string; } | { twoAuth: boolean; }> {
    const validateField = loginSchema.safeParse(payload);

    if (!validateField.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password, code } = validateField.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Invalid credentials!' };
    }

    if (!existingUser.emailVerified) {
        /**
         * If the user has not verified their email, generate a new verification token
         * and return it in the response.
         *
         * @see generateVerificationToken
         */
        await generateVerificationToken(existingUser.email);

        return {
            error: 'Please verify your email!',
        };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            // Check the two-factor authentication code
            const twoAuthCode = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if (!twoAuthCode) {
                return { error: 'Invalid 2FA code!' };
            }

            if (twoAuthCode.token !== code) {
                return { error: 'Invalid 2FA code!' };
            }

            const hasExpired = isBefore(
                new Date(twoAuthCode.expires),
                new Date()
            );

            if (hasExpired) {
                return { error: '2FA code expired!' };
            }

            // Delete any existing two-factor confirmation
            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await deleteTwoFactorConfirmationById(existingConfirmation.id);
            }

            // Create a new two-factor confirmation
            await createTwoFactorConfirmation(existingUser.id);
        } else {
            // Generate a new two-factor token
            await generateTwoFactorToken(existingUser.email);

            return { twoAuth: true };
        }
    }

    try {
        /**
         * Call the signIn function to log the user in.
         *
         * @see signIn
         */
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return { success: 'Login successful!' };
    } catch (error) {
        /**
         * Handle authentication errors.
         *
         * @see AuthError
         */
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };

                default:
                    return { error: 'Something went wrong!' };
            }
        }

        throw error;
    }
}

/**
 * Logs out the user by calling the signOut function.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export async function logout() {
    await signOut();
}

/**
 * Registers a user with the provided input data.
 *
 * @param data - The input data from the user. This should contain the user's email, first name, last name, and password.
 * @returns {Promise<{ success: string } | { error: string }>}
 * A promise that resolves with an object containing either a success message, or an error message.
 */
export async function register(data: RegisterInput) {
    /**
     * First we validate the input data using the registerSchema. If the data is invalid, we return an error.
     */
    const validatedField = registerSchema.safeParse(data);

    if (!validatedField.success) {
        return { error: 'Invalid fields!' };
    }

    /**
     * Extract the user data from the validated input.
     */
    const { email, firstName, lastName, password, isTwoFactorEnabled } =
        validatedField.data;

    /**
     * Check if the user already exists in the database. If so, return an error.
     */
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'This email is already in use!' };
    }

    /**
     * Hash the password using bcrypt. This is a slow hashing algorithm, so it's suitable for storing passwords.
     */
    const hashedPassword = await bcrypt.hash(password, SALT);

    /**
     * Create the user in the database.
     */
    await prisma?.user.create({
        data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            isTwoFactorEnabled,
        },
    });

    /**
     * Generate a verification token for the user, so they can verify their email.
     */
    await generateVerificationToken(email);

    /**
     * Return a success message to the user.
     */
    return { success: 'Confirmation email sent' };
}

/**
 * Verifies a token for email verification.
 *
 * @param {string} token - The verification token to be verified.
 * @returns {Object} - An object with either an 'error' or 'success' property.
 *                    - If the token is invalid, the 'error' property will be set to "Invalid verification link!".
 *                    - If the token is expired, the 'error' property will be set to "Verification link expired!".
 *                    - If the email does not exist, the 'error' property will be set to "Email does not exist!".
 *                    - If the token is valid and not expired, the 'success' property will be set to "Email verified!".
 */
export async function verifyToken(token: string) {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Invalid verification link!' };
    }

    // const isTokenExpired = isAfter(existingToken.expires, new Date());
    const isTokenExpired = new Date(existingToken.expires) < new Date();

    if (isTokenExpired) {
        return { error: 'Verification link expired!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingToken) {
        return { error: 'Email does not exist!' };
    }

    await prisma.user.update({
        where: {
            id: existingUser?.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: 'Email verified!' };
}

/**
 * Sends a reset password email to the user with the provided email address.
 *
 * @param {ForgotPasswordInput} data - The input data containing the email address.
 * @returns {Object} - An object indicating the result of the operation. If the operation is successful, the object will have a 'success' property with the value "Reset password email sent". If there is an error, the object will have an 'error' property with a corresponding error message.
 */
export async function forgotPassword(data: ForgotPasswordInput) {
    const validatedField = forgotPasswordSchema.safeParse(data);

    if (!validatedField.success) {
        return { error: 'Invalid fields!' };
    }

    const { email } = validatedField.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'Email not found!' };
    }

    await generateResetToken(email);

    return { success: 'Reset password email sent' };
}

/**
 * Updates the password for a user using a reset token.
 *
 * @param {Object} params - The parameters for the function.
 * @param {NewPasswordInput} params.data - The new password data.
 * @param {string | null} params.token - The reset token.
 * @returns {Object} - The result of the password update.
 * @property {string} success - Indicates that the password was successfully updated.
 * @property {string} error - Indicates an error occurred during the password update.
 *   - "Token is missing!" - If the reset token is missing.
 *   - "Invalid fields!" - If the new password data is invalid.
 *   - "Password does not match!" - If the password and confirm password do not match.
 *   - "Invalid Token!" - If the reset token is invalid.
 *   - "Token is expired!" - If the reset token is expired.
 *   - "Email does not exist!" - If the email associated with the reset token does not exist.
 */
export async function newPassword({
    data,
    token,
}: {
    data: NewPasswordInput;
    token: string | null;
}) {
    if (!token) {
        return { error: 'Token is missing!' };
    }

    const validatedField = newPasswordSchema.safeParse(data);

    if (!validatedField.success) {
        return { error: 'Invalid fields!' };
    }

    const { password, confirmPassword } = validatedField.data;

    if (password !== confirmPassword) {
        return { error: 'Password does not match!' };
    }

    const existingToken = await getResetPasswordTokenByToken(token);

    if (!existingToken) {
        return { error: 'Invalid Token!' };
    }

    const isTokenExpired = new Date(existingToken.expires) < new Date();

    if (isTokenExpired) {
        return { error: 'Token is expired!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    await prisma.resetPasswordToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: 'Password updated!' };
}

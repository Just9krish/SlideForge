'use server'

import { generateVerificationToken } from '@/lib/token'
import { getUserByEmail } from '@/prismaUtils/user'
import { loginSchema, LoginInput } from '@/schema/auth.schema'
import { signIn, signOut } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

/**
 * Logs in the user by calling the signIn function.
 *
 * @param {LoginInput} payload - The payload to validate and use for login.
 * @returns {Promise<{ success: string } | { error: string }>} A promise that resolves to an object containing either a "success" property or an "error" property.
 */
export async function login(payload: LoginInput) {
    const validateField = loginSchema.safeParse(payload)

    if (!validateField.success) {
        return { error: 'Invalid fields!' }
    }

    const { email, password } = validateField.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Invalid credentials!' }
    }

    if (!existingUser.emailVerified) {
        /**
         * If the user has not verified their email, generate a new verification token
         * and return it in the response.
         *
         * @see generateVerificationToken
         */
        const verificationToken = await generateVerificationToken(
            existingUser.email
        )

        return {
            error: 'Please verify your email!',
            verificationToken,
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
        })
        return { success: 'Login successful!' }
    } catch (error) {
        /**
         * Handle authentication errors.
         *
         * @see AuthError
         */
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' }

                default:
                    return { error: 'Something went wrong!' }
            }
        }

        throw error
    }
}

/**
 * Logs out the user by calling the signOut function.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export async function logout() {
    await signOut()
}

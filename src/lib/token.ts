import { nanoid } from 'nanoid'
import { TOKEN_EXPIRATION_TIME } from '@/lib/constant'
import prisma from '@/lib/prisma'
import {
    getResetPasswordTokenByEmail,
    getTwoFactorTokenByEmail,
    getVerificationTokenByEmail,
} from '@/prismaUtils/token'
import { sendResetPasswordEmail, sendVerificationEmail } from '@/lib/mail'
import { addHours, isAfter } from 'date-fns'
import crypto from 'crypto'

export async function generateVerificationToken(email: string) {
    const token = nanoid()
    const expires = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
        // If there is a valid token, return it
        return existingToken
    } else {
        // If there is no valid token, delete any existing token and create a new one
        if (existingToken) {
            await prisma.verificationToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                vToken: token,
                expires,
            },
        })

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.vToken
        )

        return verificationToken
    }
}

/**
 * Generates a reset token for the given email address.
 *
 * @param email - The email address for which to generate the reset token.
 * @returns The generated reset token.
 */
export const generateResetToken = async (email: string) => {
    const token = nanoid()
    const expires = new Date(new Date().getTime() + 3600 * 1000) // Token expires in 1 hour

    const existingToken = await getResetPasswordTokenByEmail(email)

    if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
        return existingToken
    } else {
        if (existingToken) {
            await prisma.resetPasswordToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        const resetToken = await prisma.resetPasswordToken.create({
            data: {
                email,
                rToken: token,
                expires,
            },
        })

        await sendResetPasswordEmail(resetToken.email, resetToken.rToken)

        return resetToken
    }
}

/**
 * Generates a two-factor authentication token for the specified email address.
 * If a valid token already exists, it returns the existing token instead.
 *
 * @param email - The email address for which to generate the two-factor token.
 * @returns The two-factor authentication token object.
 */
export const generateTwoFactorToken = async (email: string) => {
    // Retrieve existing token for the given email
    const existingToken = await getTwoFactorTokenByEmail(email)

    // Check if the existing token is still valid
    if (existingToken && isAfter(new Date(existingToken.expires), new Date())) {
        return existingToken
    } else {
        // Delete the existing token if it exists
        if (existingToken) {
            await prisma.twoFactorToken.delete({
                where: {
                    id: existingToken.id,
                },
            })
        }

        // Generate a new random token
        const token = crypto.randomInt(100_000, 1_000_000).toString()

        // Set the expiration time for the new token
        const expires = addHours(new Date(), 2)

        // Create and store the new two-factor token in the database
        const twoFactorToken = await prisma.twoFactorToken.create({
            data: {
                email,
                expires,
                token: token,
            },
        })

        return twoFactorToken
    }
}

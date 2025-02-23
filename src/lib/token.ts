import { nanoid } from 'nanoid'
import { TOKEN_EXPIRATION_TIME } from '@/lib/constant'
import prisma from '@/lib/prisma'
import { getVerificationTokenByEmail } from '@/prismaUtils/token'
import { sendVerificationEmail } from '@/lib/mail'
import { isAfter } from 'date-fns'

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

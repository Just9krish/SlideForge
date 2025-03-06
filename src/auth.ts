import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { loginSchema } from '@/schema/auth.schema';
import { getUserByEmail, getUserById } from '@/prismaUtils/user';
import { getTwoFactorConfirmationByUserId } from '@/prismaUtils/twoFactorConfirmation';
import { getAcountByUserId } from '@/prismaUtils/account';

declare module 'next-auth' {
    interface Session {
        user: {
            isTwoFactorEnabled: boolean;
            isOauth: boolean;
            firstName: string;
            lastName: string;
            profileImg: string;
            subscription: boolean | null;
        } & DefaultSession['user'];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            async profile(profile) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: profile.email },
                });
                if (existingUser) {
                    return existingUser;
                } else {
                    return {
                        email: profile.email,
                        image: profile.image,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        profileImg: profile.picture,
                    };
                }
            },
        }),
        Credentials({
            async authorize(credentials) {
                const validatedField = loginSchema.safeParse(credentials);
                if (validatedField.success) {
                    const { email, password } = validatedField.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const isPassMatched = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (isPassMatched) return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // On initial sign in, user will be available.
            if (user) {
                token.sub = user.id; // Ensure id is stored
                token.email = user.email;
            }
            // Only store minimal info (id and email)
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                // Fetch the full user info from the database
                const fullUser = await getUserById(token.sub);
                session.user.id = token.sub;
                session.user.email = token.email as string;
                session.user.isTwoFactorEnabled =
                    fullUser?.isTwoFactorEnabled || false;
                // You may determine isOauth based on your logic, for example:
                session.user.isOauth = !!(await getAcountByUserId(
                    fullUser?.id || ''
                ));
                session.user.firstName = fullUser?.firstName || '';
                session.user.lastName = fullUser?.lastName || '';
                session.user.profileImg = fullUser?.profileImg || '';
                session.user.subscription = fullUser?.subscription || null;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true;
            if (user.id) {
                const existingUser = await getUserById(user.id);
                if (!existingUser?.emailVerified) return false;
                if (existingUser.isTwoFactorEnabled) {
                    const twoFactorConfirmation =
                        await getTwoFactorConfirmationByUserId(existingUser.id);
                    if (!twoFactorConfirmation) return false;
                    await prisma.twoFactorConfirmation.delete({
                        where: { id: twoFactorConfirmation.id },
                    });
                }
            } else {
                return false;
            }
            return true;
        },
    },  
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
});

import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
// import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
// import { loginSchema } from "./schema/auth.schema";
// import { getUserByEmail, getUserById } from "./repeated/user";
// import bcrypt from "bcryptjs";
// import { UserRole } from "@prisma/client";
// import { getTwoFactorConfirmationByUserId } from "@/repeated/twoFactorConfirmation";
// import { getAcountByUserId } from "./repeated/accounts";

declare module 'next-auth' {
    // interface Session {
    //     user: {
    //         role: UserRole;
    //         isTwoFactorEnabled: boolean;
    //         isOauth: boolean;
    //         firstName: string;
    //         lastName: string;
    //     } & DefaultSession["user"];
    // }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true,
            async profile(profile) {
                console.log({ profile })
                // const existingUser = await prisma.user.findUnique({
                //     where: {
                //         email: profile.email,
                //     },
                // });

                // console.log("existing user", existingUser);

                // if (existingUser) {
                //     return existingUser;
                // } else {
                //     return {
                //         email: profile.email,
                //         image: profile.image,
                //         firstName: profile.given_name,
                //         lastName: profile.family_name,
                //         profileImg: profile.picture,
                //     };
                // }
            },
        }),
        // Credentials({
        //     async authorize(credentials) {
        //         const validatedField = loginSchema.safeParse(credentials);

        //         if (validatedField.success) {
        //             const { email, password } = validatedField.data;

        //             const user = await getUserByEmail(email);

        //             if (!user || !user.password) {
        //                 return null;
        //             }

        //             const isPassMatched = await bcrypt.compare(password, user.password);

        //             if (isPassMatched) {
        //                 return user;
        //             }
        //         }

        //         return null;
        //     },
        // }),
    ],
    // callbacks: {
    //     async jwt({ token }) {
    //         if (!token.sub) {
    //             return token;
    //         }
    //         console.log("token", token);
    //         const user = await getUserById(token.sub);

    //         if (!user) {
    //             return token;
    //         }

    //         const existingAccount = await getAcountByUserId(user.id);
    //         token.isOauth = !!existingAccount;
    //         token.isTwoFactorEnabled = user.isTwoFactorEnabled;
    //         token.role = user.role;
    //         token.firstName = user.firstName;
    //         token.lastName = user.lastName;

    //         return token;
    //     },
    //     async session({ session, token }) {
    //         console.log("token", token);
    //         if (token.sub && session.user) {
    //             session.user.id = token.sub;
    //         }

    //         if (token.role && session.user) {
    //             session.user.role = token.role as UserRole;
    //             session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
    //             session.user.isOauth = token.isOauth as boolean;
    //             session.user.firstName = token.firstName as string;
    //             session.user.lastName = token.lastName as string;
    //         }

    //         return session;
    //     },

    //     async signIn({ user, account }) {
    //         if (account?.provider !== "credentials") return true;

    //         if (user.id) {
    //             const existingUser = await getUserById(user.id);

    //             // Prevent unverified user to login
    //             if (!existingUser?.emailVerified) return false;

    //             // TODO: Add 2FA check
    //             if (existingUser.isTwoFactorEnabled) {
    //                 const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
    //                     existingUser.id,
    //                 );

    //                 console.log("2FA", twoFactorConfirmation);

    //                 if (!twoFactorConfirmation) return false;

    //                 // Delete twoFactorConfirmation for next sign in

    //                 await prisma.twoFactorConfirmation.delete({
    //                     where: {
    //                         id: twoFactorConfirmation.id,
    //                     },
    //                 });
    //             }
    //         } else {
    //             return false;
    //         }

    //         return true;
    //     },
    // },

    // events: {
    //     async linkAccount({ user }) {
    //         await prisma?.user.update({
    //             where: {
    //                 id: user.id,
    //             },
    //             data: {
    //                 emailVerified: true,
    //                 emailVerifiedAt: new Date(),
    //             },
    //         });
    //     },
    // },

    pages: {
        signIn: '/login',
        error: '/error',
    },
})

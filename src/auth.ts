import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prismaClient } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";

const prismaAdapter = PrismaAdapter(prismaClient);

// @ts-ignore
prismaAdapter.createUser = async (data: User) => {
	return await prismaClient.user.create({
		data: {
			name: data.name as string,
			email: data.email as string,
			image: data.image as string,
			emailVerified: true,
		},
	});
};

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: prismaAdapter,
	providers: [
		Credentials({
			credentials: {
				email: {
					label: "Email",
					placeholder: "johndoe@email.com",
					type: "email",
					required: true,
				},
				password: {
					label: "Password",
					placeholder: "your password",
					type: "password",
					required: true,
				},
			},
			authorize: async (credentials) => {
				const email = credentials.email as string;
				const password = credentials.password as string;

				if (!email || !password) {
					null;
				}

				try {
					const user = await prismaClient.user.findUnique({
						where: {
							email: email,
						},
					});

					if (!user) return null;

					const isValid = await bcrypt.compare(
						password,
						user.password as string,
					);

					if (!isValid) return null;

					return user;
				} catch (error: any) {
					console.error(
						"Error during authentication:",
						error.message,
					);
					throw null;
				}
			},
		}),
		Github,
		Google,
	],
	callbacks: {
		async jwt({ token, user }) {
			if (token && user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (session && token) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
			}
			return session;
		},
		async signIn({ user }) {
			const existingUser = await prismaClient.user.findUnique({
				where: {
					email: user.email as string,
				},
			});
			if (existingUser?.emailVerified) {
				return true;
			}

			/// TODO: Handle verification email if email is not verified

			return true;
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/sign-in",
		// error: "/error", // Error page
	},
	debug: process.env.NODE_ENV === "development",
});

export async function getSessionServer() {
	const session = await auth();
	if (session?.user) return session as Session;
	return null;
}
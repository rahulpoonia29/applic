import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Carrer Track",
	description:
		"Career Track is a platform to help you track your career progress",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="en">
			<SessionProvider session={session}>
				<body className={inter.className + " h-screen w-screen"}>
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}

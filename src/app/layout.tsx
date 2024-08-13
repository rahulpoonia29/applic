import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ViewTransitions } from "next-view-transitions";
import { useApplication } from "@/store/useApplication";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
				<ViewTransitions>
					<body className={inter.className + " h-screen w-screen"}>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</body>
				</ViewTransitions>
				<Toaster />
			</SessionProvider>
		</html>
	);
}

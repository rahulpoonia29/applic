import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/theme/themeProvider";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({ subsets: ["latin"], weight: "600", display: "swap" });

export const metadata: Metadata = {
	title: "Applic - Job Application Management",
	description:
		"Applic is a job application management app that helps you track, organize, and manage your job applications with ease.",
	keywords:
		"job application, job tracker, career management, job search, interview scheduling",
	authors: [
		{
			name: "Applic Team",
			url: "https://rahulpoonia.vercel.app",
		},
	],
	openGraph: {
		title: "Applic",
		description:
			"Manage your job applications effortlessly with Applic. Track, schedule, and organize your job search.",
		url: "https://applic.vercel.app", // Website URL
		siteName: "Applic",
		images: [
			{
				url: "https://applic./vercel.app/logo.png", // URL to logo
				width: 800,
				height: 600,
				alt: "Applic Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Applic",
		description:
			"Efficient job application management with Applic. Track and organize your job search with ease.",
		images: [
			{
				url: "https://applic./vercel.app/logo.png", // URL to logo
				width: 800,
				height: 600,
				alt: "Applic Logo",
			},
		],
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
		{ media: "(prefers-color-scheme: dark)", color: "#27272A" },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en" >
			<SessionProvider session={session}>
				<ViewTransitions>
					<body className={inter.className + " h-screen w-screen"}>
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem
							disableTransitionOnChange
						>
							{children}
						</ThemeProvider>
					</body>
				</ViewTransitions>
				<Toaster position="top-center" />
			</SessionProvider>
		</html>
	);
}

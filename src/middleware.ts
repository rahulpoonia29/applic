// export { auth as middleware } from "@/auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
	const session = await auth();
	const url = request.nextUrl;

	if (
		session &&
		(url.pathname.startsWith("/sign-in") ||
			url.pathname.startsWith("/sign-up") ||
			url.pathname.startsWith("/forgot-password") ||
			url.pathname.startsWith("/verify-email") ||
			url.pathname === "/")
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	} else if (
		!session &&
		(url.pathname.startsWith("/dashboard") ||
			url.pathname.startsWith("/documents"))
	) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
}

export const config = {
	matcher: [
		"/sign-in",
		"/sign-up",
		"/forgot-password",
		"/verify-email",
		"/",
		"/dashboard/:path*",
		"/documents/:path*",
	],
};

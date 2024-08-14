import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { getSessionServer } from "@/auth";

// GET /api/application/applications
// Get all applications route
export const GET = async (req: Request) => {
	try {
		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const applications = await prismaClient.user.findUnique({
			where: {
				email: session.user.email,
			},
			select: {
				applications: true,
			},
		});

		if (!applications) {
			return NextResponse.json(
				{ success: false, error: "No applications found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ success: true, applications: applications.applications },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 }
		);
	}
};

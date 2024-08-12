import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { getSessionServer } from "@/auth";

// Get all applications route
export const GET = async (req: Request) => {
	const session = await getSessionServer();
	try {
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

// Update application route
export const PATCH = async (req: Request) => {
	const { application } = await req.json();

	try {
		const updatedApplication = prismaClient.jobApplication.update({
			where: {
				id: application.id,
			},
			data: {
				...application,
			},
		});

		return NextResponse.json(
			{ success: true, application: updatedApplication },
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

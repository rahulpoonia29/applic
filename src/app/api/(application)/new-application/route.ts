import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// Create new application route
export const POST = async (req: Request) => {
	try {
		const { application } = await req.json();
		if (!application) {
			return NextResponse.json(
				{ success: false, error: "Invalid application" },
				{ status: 400 }
			);
		}

		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const user = await prismaClient.user.findUnique({
			where: {
				email: session.user.email,
			},
			include: {
				applications: true, // This will include related JobApplication records
			},
		});
		if (!user) {
			return NextResponse.json(
				{ success: false, error: "User not found" },
				{ status: 404 }
			);
		}

		const newApplication = await prismaClient.jobApplication.create({
			data: {
				...application,
				userId: user.id, // Automatically associates the application with the user
			},
		});

		return NextResponse.json(
			{
				success: true,
				application: newApplication,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 }
		);
	}
};

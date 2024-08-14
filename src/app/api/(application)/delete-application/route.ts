import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// DELETE /api/application/delete-application
// Delete a job application
export const DELETE = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const applicationId = url.searchParams.get("applicationId");
		if (!applicationId) {
			return NextResponse.json(
				{ success: false, message: "Invalid application ID" },
				{ status: 400 }
			);
		}

		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
				},
				{ status: 401 }
			);
		}

		const application = await prismaClient.jobApplication.findUnique({
			where: {
				id: parseInt(applicationId),
				userId: session.user.id,
			},
			select: {
				id: true,
			},
		});

		if (!application) {
			return NextResponse.json(
				{ success: false, message: "Application not found" },
				{ status: 404 }
			);
		}

		await prismaClient.jobApplication.delete({
			where: {
				id: parseInt(applicationId),
			},
		});

		return NextResponse.json(
			{ success: true, message: "Application deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				success: false,
				message: "Server error. Please try again later.",
			},
			{ status: 500 }
		);
	}
};

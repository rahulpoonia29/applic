import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/restore
// Restore an archived application
export const POST = async (req: Request) => {
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
				previousStatus: true,
			},
		});
		if (!application) {
			return NextResponse.json(
				{
					success: false,
					message: "Application not found",
				},
				{ status: 404 }
			);
		}

		await prismaClient.jobApplication.update({
			where: { id: parseInt(applicationId) },
			data: {
				status: application.previousStatus || "bookmarked",
				previousStatus: null,
			},
		});
		return NextResponse.json(
			{
				success: true,
				message: "Application restored successfully",
			},
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

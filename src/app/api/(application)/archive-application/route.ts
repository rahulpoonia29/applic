import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/application/archive-application
// Archive a job application
export const PATCH = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const applicationId = url.searchParams.get("applicationId");
		if (!applicationId || isNaN(Number(applicationId))) {
			return NextResponse.json(
				{ success: false, message: "Invalid application ID" },
				{ status: 400 },
			);
		}

		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
				},
				{ status: 401 },
			);
		}

		const application = await prismaClient.jobApplication.findUnique({
			where: {
				id: parseInt(applicationId),
				userId: session.user.id,
			},
			select: {
				id: true,
				status: true,
			},
		});
		if (!application) {
			return NextResponse.json(
				{
					success: false,
					message: "Application not found",
				},
				{ status: 404 },
			);
		}

		await prismaClient.jobApplication.update({
			where: {
				id: parseInt(applicationId),
			},
			data: {
				status: "archived",
				previousStatus: application.status,
			},
		});
		return NextResponse.json(
			{
				success: true,
				message: "Application archived successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in archiving application: ", error);
		return NextResponse.json(
			{
				success: false,
				message: "Server error. Please try again later.",
			},
			{ status: 500 },
		);
	}
};

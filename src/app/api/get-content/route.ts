import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/get-content?applicationId={applicationId}
export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const applicationId = parseInt(
			searchParams.get("applicationId") || "",
			10,
		);

		if (isNaN(applicationId)) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid application ID",
				},
				{ status: 400 },
			);
		}

		// Check for user session
		const session = await getSessionServer();
		if (!session || !session.user || !session.user.id) {
			return NextResponse.json(
				{
					success: false,
					error: "Unauthorized",
				},
				{ status: 401 },
			);
		}

		const userId = session.user.id;

		// Retrieve the content from the database
		const content = await prismaClient.content.findUnique({
			where: {
				applicationId: applicationId,
				userId: userId,
			},
		});

		if (!content) {
			return NextResponse.json(
				{
					success: false,
					error: "Content not found",
				},
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				content: content.content,
			},
			{ status: 200 },
		);
	} catch (error) {
		// Log the error for debugging purposes
		console.error("Error retrieving content:", error);

		// Return a generic server error message
		return NextResponse.json(
			{
				success: false,
				error: "Server error. Please try again later.",
			},
			{ status: 500 },
		);
	}
};

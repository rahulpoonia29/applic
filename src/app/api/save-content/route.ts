import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// POST /api/save-content
export const POST = async (req: Request) => {
	try {
		const {
			applicationId,
			userContent,
		}: {
			applicationId: number;
			userContent: Prisma.InputJsonValue;
		} = await req.json();

		// Validate the input fields
		if (!userContent) {
			return NextResponse.json(
				{
					success: false,
					error: "All fields are required",
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

		// Find the application based on the application ID and user ID
		const application = await prismaClient.jobApplication.findUnique({
			where: {
				id: applicationId,
				userId: userId,
			},
			select: { id: true }, // Adjust as needed
		});

		if (!application) {
			return NextResponse.json(
				{
					success: false,
					error: "Application not found",
				},
				{ status: 404 },
			);
		}

		// Save the content to the database
		const content = await prismaClient.content.upsert({
			where: {
				applicationId: applicationId,
				userId: userId,
			},
			update: {
				content: userContent,
			},
			create: {
				applicationId: applicationId,
				content: userContent,
				userId: userId,
			},
		});

		if (!content) {
			return NextResponse.json(
				{
					success: false,
					error: "Failed to save content",
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Content saved successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		// Log the error for debugging purposes
		console.error("Error saving content:", error);

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

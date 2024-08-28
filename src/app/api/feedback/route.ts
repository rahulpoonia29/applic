import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/feedback
// Create a new feedback request
// Required fields: category, subject, description
export const POST = async (req: Request) => {
	try {
		const {
			feedbackCategory: category,
			subject,
			description,
		}: {
			feedbackCategory: string;
			subject: string;
			description: string;
		} = await req.json();

		// Validate the input fields
		if (!category || !subject || !description) {
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
		if (!session) {
			return NextResponse.json(
				{
					success: false,
					error: "Unauthorized",
				},
				{ status: 401 },
			);
		}

		// Find the user based on session information
		const user = await prismaClient.user.findUnique({
			where: {
				id: session.user.id,
				email: session.user.email,
			},
			select: {
				id: true,
			},
		});
		if (!user) {
			return NextResponse.json(
				{
					success: false,
					error: "User not found",
				},
				{ status: 404 },
			);
		}

		// Create the feedback request
		await prismaClient.feedback.create({
			data: {
				category,
				subject,
				description,
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				success: true,
				message: "Feedback request submitted successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		// Log the error for debugging purposes
		console.error("Error creating feedback request:", error);

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

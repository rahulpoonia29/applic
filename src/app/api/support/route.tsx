import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { SupportStatus } from "@prisma/client";
import { NextResponse } from "next/server";

// POST /api/support
// Create a new support request
// Required fields: category, subject, description, status
export const POST = async (req: Request) => {
	try {
		const {
			issueCategory: category,
			subject,
			description,
			status,
		}: {
			issueCategory: string;
			subject: string;
			description: string;
			status: SupportStatus;
		} = await req.json();

		// Validate the input fields
		if (!category || !subject || !description || !status) {
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

		// Create the support request
		const support = await prismaClient.support.create({
			data: {
				category,
				subject,
				description,
				status,
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				success: true,
				message: "Support request created successfully",
				support,
			},
			{ status: 200 },
		);
	} catch (error) {
		// Log the error for debugging purposes
		console.error("Error creating support request:", error);

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

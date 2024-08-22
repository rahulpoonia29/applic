import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { getSessionServer } from "@/auth";

// GET /api/documents
// Get all documents route
export const GET = async (req: Request) => {
	try {
		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const documents = await prismaClient.document.findMany({
			where: {
				userId: session.user.id,
			},
		});

		if (!documents) {
			return NextResponse.json(
				{ success: false, error: "No documents found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ success: true, documents: documents },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 },
		);
	}
};

import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/document/add-document
// Create a new document
// Required fields: name, type, size, url, userId
export const POST = async (req: Request) => {
	try {
		const {
			name,
			type,
			size,
			url,
			userId,
		}: {
			name: string;
			type: string;
			size: number;
			url: string;
			userId: string;
		} = await req.json();

		if (!name || !type || !size || !url || !userId) {
			return NextResponse.json(
				{ success: false, message: "All fields are required" },
				{ status: 400 },
			);
		}

		const session = await getSessionServer();
		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const user = await prismaClient.user.findUnique({
			where: {
				id: userId,
				email: session.user.email,
			},
			include: {
				applications: true, // This will include related JobApplication records
			},
		});
		if (!user) {
			return NextResponse.json(
				{ success: false, error: "User not found" },
				{ status: 404 },
			);
		}

		const document = await prismaClient.document.create({
			data: {
				name,
				type,
				size,
				url,
				userId,
			},
		});

		return NextResponse.json(
			{
				success: true,
				message: "Application created successfully",
				application: document,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in creating new document: ", error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 },
		);
	}
};

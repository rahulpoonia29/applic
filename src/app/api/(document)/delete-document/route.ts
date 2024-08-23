import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// DELETE /api/document/delete-document
// Delete a document
// Required params : documentId
export const DELETE = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const documentId = url.searchParams.get("documentId");
		if (!documentId) {
			return NextResponse.json(
				{ success: false, message: "Invalid document ID" },
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
		const document = await prismaClient.document.delete({
			where: {
				id: parseInt(documentId),
				userId: session.user.id,
			},
		});

		if (!document) {
			return NextResponse.json(
				{ success: false, message: "Document not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ success: true, message: "Document deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				success: false,
				message: "Server error. Please try again later.",
			},
			{ status: 500 },
		);
	}
};

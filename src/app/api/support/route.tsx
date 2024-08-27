import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { SupportStatus } from "@prisma/client";
import { isValid, parseISO } from "date-fns";
import { NextResponse } from "next/server";

// model Support {
//     id          String        @id @default(uuid())
//     category    String
//     subject     String
//     description String
//     status      SupportStatus @default(PENDING)
//     createdAt   DateTime      @default(now())
//     updatedAt   DateTime      @updatedAt
//     userId      String
//     user        User          @relation(fields: [userId], references: [id])
//   }

// GET /api/support
// Required fields: category, subject, description, status
export const POST = async (req: Request) => {
	try {
		const {
			category,
			subject,
			description,
			status,
		}: {
			category: string;
			subject: string;
			description: string;
			status: SupportStatus;
		} = await req.json();

		if (!category || !subject || !description || !status) {
			return NextResponse.json(
				{
					success: false,
					message: "All fields are required",
				},
				{ status: 400 },
			);
		}

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
				message: "Support created successfully",
				support: support,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in creating new support: ", error);
		return NextResponse.json(
			{
				success: false,
				error: "Server error. Please try again later.",
			},
			{ status: 500 },
		);
	}
};

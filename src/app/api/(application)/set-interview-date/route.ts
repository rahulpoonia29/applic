import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/set-interview-date?applicationId={date}&interviewDate={date}&sendEmail={boolean}
// Set the interview date for an application
export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const applicationId = url.searchParams.get("applicationId");
		const interviewDate = Date.parse(
			url.searchParams.get("interviewDate") as string
		);
		const sendEmail = url.searchParams.get("sendEmail");
		if (
			!applicationId ||
			!interviewDate ||
			!sendEmail ||
			isNaN(Number(applicationId))
		) {
			return NextResponse.json(
				{ success: false, message: "Invalid parameters" },
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

		const application = await prismaClient.jobApplication.update({
			where: {
				id: parseInt(applicationId),
				userId: session.user.id,
			},
			data: {
				interview: true,
				interviewDate: new Date(interviewDate),
				emailSentDate: new Date(
					new Date(interviewDate).setDate(
						new Date(interviewDate).getDate() - 1
					)
				),
			},
			select: {
				id: true,
				interview: true,
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

		return NextResponse.json(
			{
				success: true,
				message: "Interview date set successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error in setting interview date: ", error);
		return NextResponse.json(
			{
				success: false,
				message: "Server error. Please try again later.",
			},
			{ status: 500 }
		);
	}
};

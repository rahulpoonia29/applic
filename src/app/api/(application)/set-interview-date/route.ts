import { getSessionServer } from "@/auth";
import { prismaClient } from "@/lib/db";
import { isValid, parseISO } from "date-fns";
import { NextResponse } from "next/server";

// GET /api/set-interview-date?applicationId={id}&interviewDate={date}&sendEmail={boolean}
// Set the interview date for an application
export const GET = async (req: Request) => {
	try {
		const url = new URL(req.url);
		const applicationId = url.searchParams.get("applicationId");
		// interview date is in ISO format
		const interviewDate = url.searchParams.get("interviewDate");
		// Expected values are "0" or "1"
		const sendEmail = url.searchParams.get("sendEmail");

		// Check for required parameters and validate interviewDate as ISO string
		if (
			!applicationId ||
			!interviewDate ||
			!sendEmail ||
			isNaN(Number(applicationId)) ||
			!isValid(parseISO(interviewDate)) ||
			!(sendEmail === "0" || sendEmail === "1")
		) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid parameters",
					data: {
						applicationId,
						interviewDate,
						sendEmail,
					},
				},
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

		// Convert ISO string to Date object
		const interviewDateObject = new Date(interviewDate);

		// Convert sendEmail to boolean
		const sendEmailBoolean = sendEmail === "1";

		const application = await prismaClient.jobApplication.update({
			where: {
				id: parseInt(applicationId),
				userId: session.user.id,
			},
			data: {
				interview: true,
				interviewDate: interviewDateObject,
				emailSentDate: sendEmailBoolean ? interviewDateObject : null,
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
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Interview date set successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in setting interview date: ", error);
		return NextResponse.json(
			{
				success: false,
				message: "Server error. Please try again later.",
			},
			{ status: 500 },
		);
	}
};

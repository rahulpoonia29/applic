"use server";

import { auth } from "@/auth";
import { prismaClient } from "@/lib/db";

export default async function setInterviewerEmail(
	interviewerEmail: string,
	applicationId: number,
) {
	try {
		const session = await auth();

		if (!session) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}

		const application = await prismaClient.jobApplication.update({
			where: { id: applicationId, userId: session.user.id },
			data: {
				interviewerEmail: interviewerEmail,
			},
		});

		if (!application) {
			return {
				success: false,
				message: "Application not found",
			};
		}

		return {
			success: true,
			message: `Interviewer email has been set to ${interviewerEmail}`,
		};
	} catch (error: any) {
		console.error("Failed to set interviewer email:", error);
		return {
			success: false,
			message: error.message,
		};
	}
}

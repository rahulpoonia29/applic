import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/db";
import { getSessionServer } from "@/auth";

export const GET = async (req: Request) => {
	try {
		const session = await getSessionServer();

		if (!session) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const applications = await prismaClient.user.findUnique({
			where: {
				email: session.user.email,
			},
			select: {
				applications: true,
			},
		});

		// const applications = [
		// 	{
		// 		posting_link: "https://www.google.com",
		// 		role: "Software Engineer",
		// 		company: "Google",
		// 		salary: 3000000,
		// 		type: "remote",
		// 		location: "Mountain View",
		// 		country: "USA",
		// 		status: "bookmarked",
		// 	},
		// ];

		if (!applications) {
			return NextResponse.json(
				{ success: false, error: "No applications found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ success: true, applications: applications.applications },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 }
		);
	}
};

export const POST = async (req: Request) => {
	try {
		const { id, application } = await req.json();
		console.log("id", id);
		console.log("application", application);

		// const session = await getSessionServer();

		// if (!session) {
		// 	return NextResponse.json(
		// 		{ success: false, error: "Unauthorized" },
		// 		{ status: 401 }
		// 	);
		// }

		const user = await prismaClient.user.findUnique({
			where: {
				id,
				// email: session.user.email,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ success: false, error: "User not found" },
				{ status: 404 }
			);
		}

		const newApplication = prismaClient.jobApplication.create(application);

		return NextResponse.json(
			{ success: true, application: newApplication },
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 }
		);
	}
};

export const PATCH = async (req: Request) => {
	const { application } = await req.json();

	try {
		const updatedApplication = prismaClient.jobApplication.update({
			where: {
				id: application.id,
			},
			data: {
				...application,
			},
		});

		return NextResponse.json(
			{ success: true, application: updatedApplication },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: "Server error. Please try again later." },
			{ status: 500 }
		);
	}
};

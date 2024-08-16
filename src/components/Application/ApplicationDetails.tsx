"use client";

import daysToInterview from "@/lib/daysToInterview";
import statusActions from "@/lib/statusActions";
import { JobApplication } from "@prisma/client";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";

type Props = {
	application: JobApplication;
};

function ApplicationDetails({ application }: Props) {
	const { moveApplication } = useApplication();
    const { onOpen } = useModal();

	type key = Exclude<
		keyof typeof application,
		| "id"
		| "userId"
		| "previousStatus"
		| "emailSentDate"
		| "createdAt"
		| "updatedAt"
	>;
	const fields: {
		key: key;
		label: string;
	}[] = [
		{ key: "role", label: "Role" },
		{ key: "company", label: "Company" },
		{ key: "salary", label: "Salary" },
		{ key: "type", label: "Type" },
		{ key: "location", label: "Location" },
	];

	const normalFormat = ["role", "company", "type", "status"];
	return (
		<div className="grid gap-6">
			<div className="grid grid-cols-2 gap-x-4 gap-y-3">
				{fields.map(
					(field) =>
						application[field.key] && (
							<div
								key={field.key}
								className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm"
							>
								<span className="font-semibold text-gray-700">
									{field.label}:
								</span>
								<span className="capitalize text-gray-500">
									{normalFormat.includes(field.key) &&
										(application[field.key] as string)}

									{field.key === "salary" &&
										(application.salary / 100000)
											.toFixed(2)
											.replace(/\.00$/, "") + " LPA"}

									{field.key === "location" &&
										application.location +
											", " +
											application.country}
								</span>
							</div>
						),
				)}
				{application.status && (
					<div
						key="status"
						className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm"
					>
						<span className="font-semibold text-gray-700">
							Status:
						</span>
						<span className="capitalize text-gray-500">
							{application.status === "bookmarked"
								? "Bookmarked"
								: application.status === "applied"
									? "Applied"
									: application.status === "interview"
										? "Interview Scheduled"
										: application.status === "offer"
											? "Got Offer"
											: "Rejected"}
						</span>
					</div>
				)}
				{application.status === "interview" &&
					!application.interviewDate && (
						<Button
							variant={"outline"}
							className="col-span-2 flex justify-center gap-2"
							onClick={() =>
								onOpen("set-interview-date", {
									applicationId: application.id,
								})
							}
						>
							Set Date
						</Button>
					)}
				{application.interview && (
					<>
						<div
							key="interview"
							className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm"
						>
							<span className="font-semibold text-gray-700">
								Interview:
							</span>
							<span className="capitalize text-gray-500">
								{daysToInterview(
									application.interviewDate || new Date(),
								)}
							</span>
						</div>
						{application.interviewerEmail && (
							<div
								key="interviewerEmail"
								className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm"
							>
								<span className="font-semibold text-gray-700">
									Interviewer Email:
								</span>
								<span className="capitalize text-gray-500">
									{application.interviewerEmail}
								</span>
							</div>
						)}
					</>
				)}
			</div>
			<div className="grid grid-cols-2 gap-4">
				{statusActions[application.status].map((status, key) => {
					const actions = statusActions[application.status];
					const isLastAction = key === actions.length - 1;

					// Determine the arrow icon based on the number of actions
					const ArrowIcon =
						actions.length === 2 && key === 0
							? MoveLeft
							: MoveRight;

					return status.condition(application) ? (
						<Button
							key={key}
							variant={"outline"}
							className={`flex items-center justify-center gap-2 ${
								actions.length === 2
									? "col-span-1"
									: "col-span-2"
							} ${
								application.status === "interview" &&
								"col-span-2"
							} `}
							onClick={() =>
								moveApplication(
									application.id,
									status.actionStatus,
								)
							}
						>
							{/* Show the left arrow for the first action if there are two actions */}
							{actions.length === 2 && key === 0 && (
								<MoveLeft className="size-4" strokeWidth={2} />
							)}

							{/* Show the status text */}
							<span>{status.text}</span>

							{/* Show the right arrow for the second action or the only action */}
							{(actions.length === 2 && key === 1) ||
							actions.length === 1 ? (
								<MoveRight className="size-4" strokeWidth={2} />
							) : null}
						</Button>
					) : null;
				})}
			</div>
		</div>
	);
}

export default ApplicationDetails;

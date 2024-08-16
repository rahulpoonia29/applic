"use client";

import {
	Check,
	CheckCheck,
	FileArchive,
	SquareArrowUpRight,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { JobApplication, JobStatus } from "@prisma/client";
import Link from "next/link";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";
import { isPast } from "date-fns";
import BadgeButton from "../badge";
import daysToInterview from "@/lib/daysToInterview";
import { useMediaQuery } from "usehooks-ts";

type Props = {
	applications: JobApplication[];
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
};

type Action = {
	text: string;
	color: string;
	actionStatus: JobStatus;
	condition: (application: JobApplication) => boolean;
};

type StatusActions = {
	[status: string]: Action[];
};

const statusActions: StatusActions = {
	bookmarked: [
		{
			text: "Move to Applied",
			color: "neutral",
			actionStatus: "applied",
			condition: () => true,
		},
	],
	applied: [
		{
			text: "Move to Bookmarked",
			color: "neutral",
			actionStatus: "bookmarked",
			condition: () => true,
		},
		{
			text: "Move to Interview Scheduled",
			color: "neutral",
			actionStatus: "interview",
			condition: () => true,
		},
	],
	interview: [
		{
			text: "Move to Applied",
			color: "neutral",
			actionStatus: "applied",
			condition: (application) => !application.interviewDate,
		},
		{
			text: "Got Offer",
			color: "green",
			actionStatus: "offer",
			condition: (application) =>
				application.interviewDate && isPast(application.interviewDate)
					? true
					: false,
		},
	],
	offer: [],
};

function Applications({ applications, status }: Props) {
	const { onOpen } = useModal();
	const { moveApplication } = useApplication();
	const isMobie = useMediaQuery("(max-width: 640px)");

	if (applications.length === 0) {
		return (
			<div className="border- w-full divide-y divide-neutral-200 rounded-lg border bg-white">
				<div className="flex items-center justify-between space-x-4 px-6 py-3 text-sm text-neutral-700">
					<div className="flex items-center justify-center space-x-4">
						<span className="font-semiold line-clamp-1 font-medium text-neutral-700">
							No applications found
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="border- w-full divide-y divide-neutral-200 rounded-lg border bg-white">
			{applications
				.sort((a, b) => a.salary - b.salary)
				.map((application, index: number) => (
					<div
						key={index}
						className="flex items-center justify-between space-x-4 px-2 py-2 text-sm text-neutral-700 sm:px-4 sm:py-3 xl:pr-4"
					>
						<div className="flex items-center justify-center space-x-3">
							<BadgeButton
								text={
									(application.salary / 100000)
										.toFixed(2)
										.replace(/\.00$/, "") + " LPA"
								}
								color={
									application.status === "offer"
										? "green"
										: application.status === "interview"
											? "blue"
											: "orange"
								}
							/>
							<span className="font-semiold flex-wrap font-medium text-neutral-700">
								{application.role}, {application.company}
							</span>
							{status === "interview" &&
								(!application.interviewDate ? (
									<BadgeButton
										text="Set Date"
										color="red"
										hoverColor="red"
										hidden="sm"
										onClick={() =>
											onOpen("set-interview-date", {
												applicationId: application.id,
											})
										}
									/>
								) : (
									<BadgeButton
										text={daysToInterview(
											application.interviewDate,
										)}
										color={
											isPast(application.interviewDate)
												? "green"
												: "blue"
										}
										hidden="sm"
										className="capitalize"
									/>
								))}
						</div>
						<div className="flex items-center justify-center space-x-4">
							<div className="flex items-center justify-center space-x-2">
								{application.type !== "onsite" ? (
									<BadgeButton
										text={application.type}
										color="green"
										className="capitalize"
										hidden={
											(application.status === "applied" &&
												"xl") ||
											(application.status === "offer" &&
												"sm") ||
											(application.status !== "applied" &&
												"lg") ||
											undefined
										}
									/>
								) : (
									<BadgeButton
										text={
											application.location +
											", " +
											application.country
										}
										color="cyan"
										hidden={
											(application.status === "applied" &&
												"xl") ||
											(application.status === "offer" &&
												"sm") ||
											(application.status !== "applied" &&
												"lg") ||
											undefined
										}
									/>
								)}

								{statusActions[application.status].map(
									(status, key) =>
										status.condition(application) && (
											<BadgeButton
												key={key}
												text={status.text}
												color={status.color}
												hoverColor={status.color}
												hidden="lg"
												onClick={() =>
													moveApplication(
														application.id,
														status.actionStatus,
													)
												}
											/>
										),
								)}
							</div>
							<div className="flex items-center justify-center space-x-3 sm:space-x-2">
								<TooltipProvider delayDuration={300}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Link
												href={application.posting_link}
												about="Posting Link"
											>
												<SquareArrowUpRight className="z-10 size-4 cursor-pointer text-gray-400 transition hover:text-blue-500" />
											</Link>
										</TooltipTrigger>
										<TooltipContent
											sideOffset={6}
											className="mr-5"
											asChild
										>
											<p>Visit</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger
											asChild
											onClick={() =>
												onOpen("archive-application", {
													applicationId:
														application.id,
												})
											}
										>
											<FileArchive className="z-10 size-4 cursor-pointer text-gray-400 transition hover:text-teal-500" />
										</TooltipTrigger>
										<TooltipContent
											sideOffset={6}
											className="mr-5"
											asChild
										>
											<p>Archive</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}

export default Applications;

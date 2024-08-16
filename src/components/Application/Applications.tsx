"use client";

import { Badge } from "../ui/badge";
import { FileArchive, SquareArrowUpRight } from "lucide-react";
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
import { differenceInDays, isPast, isToday, isTomorrow } from "date-fns";
import BadgeButton from "../badge";
import daysToInterview from "@/lib/daysToInterview";

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
			condition: (application) => true,
		},
	],
	applied: [
		{
			text: "Move to Bookmarked",
			color: "neutral",
			actionStatus: "bookmarked",
			condition: (application) => true,
		},
		{
			text: "Move to Interview Scheduled",
			color: "neutral",
			actionStatus: "interview",
			condition: (application) => true,
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
			// condition: (application) => true,
			// },
			condition: (application) =>
				application.interviewDate && isPast(application.interviewDate) ? true : false,
		},
	],
	offer: [
		// {
		// 	text: "Move to Interview",
		// 	color: "neutral",
		// 	actionStatus: "interview",
		// 	condition: (application) => true,
		// },
	],
};

function Applications({ applications, status }: Props) {
	const { onOpen } = useModal();
	const { moveApplication } = useApplication();

	if (applications.length === 0) {
		return (
			<div className="bg-white border divide-neutral-200 border- w-full divide-y rounded-lg">
				<div className="px-6 py-3 space-x-4 flex items-center justify-between text-sm text-neutral-700">
					<div className="flex items-center justify-center space-x-4">
						<span className="font-semiold font-medium line-clamp-1 text-neutral-700">
							No applications found
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white border divide-neutral-200 border- w-full divide-y rounded-lg">
			{applications.map((application, index) => (
				<div
					key={index}
					className="px-2 sm:px-4 xl:pr-4 py-2 sm:py-3 space-x-4 flex items-center justify-between text-sm text-neutral-700"
				>
					<div className="flex items-center justify-center space-x-3">
						<BadgeButton
							text={
								(application.salary / 100000)
									.toFixed(2)
									.replace(/\.00$/, "") + " LPA"
							}
							className="bg-orange-100/30 text-orange-600 border-orange-200"
						/>
						<span className="font-semiold font-medium line-clamp-1 text-neutral-700">
							{application.role}, {application.company}
						</span>
						{status === "interview" &&
							(!application.interviewDate ? (
								<BadgeButton
									text="Set Date"
									className="hidden sm:inline-block bg-red-100/30 text-red-600 border-red-200 hover:bg-red-300/30 hover:border-red-300 hover:text-red-700"
									onClick={() =>
										onOpen("set-interview-date", {
											applicationId: application.id,
										})
									}
								/>
							) : (
								<BadgeButton
									text={daysToInterview(
										application.interviewDate
									)}
									className={`hidden sm:inline-block capitalize bg-blue-100/30 text-blue-600 border-blue-200 ${
										isPast(application.interviewDate) &&
										"bg-green-100/30 text-green-600 border-green-200"
									}`}
								/>
							))}
					</div>
					<div className="flex items-center justify-center space-x-4">
						<div className="flex items-center justify-center space-x-2">
							{application.type !== "onsite" ? (
								<BadgeButton
									text={application.type}
									className={`hidden sm:inline-block border w-fit rounded-sm text-center font-normal bg-green-100/30 text-green-600 border-green-200 capitalize`}
								/>
							) : (
								<BadgeButton
									text={
										application.location +
										", " +
										application.country
									}
									color="cyan"
									className="hidden xl:inline-block bg-cyan-100/30 text-cyan-600 border-cyan-200"
								/>
							)}

							{statusActions[application.status].map(
								(status) =>
									status.condition(application) && (
										<BadgeButton
											text={status.text}
											className="hidden xl:inline-block bg-neutral-100/30 text-neutral-600 border-neutral-200  hover:bg-neutral-300/30 hover:border-neutral-300 hover:text-neutral-700 cursor-pointer"
											onClick={() =>
												moveApplication(
													application.id,
													status.actionStatus
												)
											}
										/>
									)
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
											<SquareArrowUpRight className="size-4 cursor-pointer text-gray-400 z-10 hover:text-blue-500 transition" />
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
												applicationId: application.id,
											})
										}
									>
										<FileArchive className="size-4 cursor-pointer text-gray-400 z-10 hover:text-teal-500 transition" />
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

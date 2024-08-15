"use client";

import { Badge } from "../ui/badge";
import { FileArchive, SquareArrowUpRight } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { JobApplication } from "@prisma/client";
import Link from "next/link";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";

type Props = {
	applications: JobApplication[];
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
};

const describeDate = (date: Date): string => {
	const today = new Date();

	if (date < today) {
		return "Interview date has passed";
	} else if (isToday(date)) {
		return "Scheduled today";
	} else if (isTomorrow(date)) {
		return "Scheduled tomorrow";
	} else {
		const days = differenceInDays(date, today);
		return `Scheduled in ${days} day${days > 1 ? "s" : ""}`;
	}
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
						<Badge
							variant={"outline"}
							className="border rounded-sm text-center line-clamp-1 text-nowrap bg-orange-100/30 text-orange-600 border-orange-200 tabular-nums font-normal"
						>
							{(application.salary / 100000)
								.toFixed(2)
								.replace(/\.00$/, "")}{" "}
							LPA
						</Badge>
						<span className="font-semiold font-medium line-clamp-1 text-neutral-700">
							{application.role}, {application.company}
						</span>
						{status === "applied" && (
							<Badge
								variant={"outline"}
								className={`hidden sm:inline-block border w-fit rounded-sm text-center font-normal ${
									application.type === "onsite"
										? "bg-purple-100/30 text-purple-600 border-purple-200"
										: application.type === "remote"
										? "bg-green-100/30 text-green-600 border-green-200"
										: "bg-green-100/30 text-green-600 border-green-200"
								}`}
							>
								{application.type === "onsite"
									? "Onsite"
									: application.type === "remote"
									? "Remote"
									: "Hybrid"}
							</Badge>
						)}
						{status === "interview" &&
							(!application.interviewDate ? (
								<Badge
									variant={"outline"}
									className="hidden sm:inline-block border text-nowrap rounded-sm cursor-pointer bg-red-100/30 text-red-600 border-red-200 hover:bg-red-300/30 hover:border-red-300 transition hover:text-red-700 tabular-nums font-normal"
									onClick={() =>
										onOpen("set-interview-date", {
											applicationId: application.id,
										})
									}
								>
									Set Date
								</Badge>
							) : (
								<Badge
									variant={"outline"}
									className="hidden sm:inline-block border text-nowrap rounded-sm cursor-pointer bg-blue-100/30 text-blue-600 border-blue-200 tabular-nums font-normal"
								>
									{describeDate(application.interviewDate) ||
										"No upcoming interview"}
								</Badge>
							))}
					</div>
					<div className="flex items-center justify-center space-x-4">
						<div className="flex items-center justify-center space-x-3">
							{status === "bookmarked" && (
								<Badge
									variant={"outline"}
									className="hidden lg:inline-block border text-nowrap rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 tabular-nums font-normal"
									onClick={() =>
										moveApplication(
											application.id,
											"applied"
										)
									}
								>
									Move to Applied
								</Badge>
							)}
							{status === "applied" && (
								<>
									<Badge
										variant={"outline"}
										className="hidden x lg:inline-block text-nowrap w-fit border rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 font-normal"
										onClick={() =>
											moveApplication(
												application.id,
												"bookmarked"
											)
										}
									>
										Move to Bookmarked
									</Badge>
									<Badge
										variant={"outline"}
										className="hidden lg:inline-block text-nowrap w-fit border rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 font-normal"
										onClick={() =>
											moveApplication(
												application.id,
												"interview"
											)
										}
									>
										Move to Interview Scheduled
									</Badge>
								</>
							)}
							{status === "interview" &&
								!application.interviewDate && (
									<Badge
										variant={"outline"}
										className="hidden lg:inline-block border text-nowrap rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 tabular-nums font-normal"
										onClick={() =>
											moveApplication(
												application.id,
												"applied"
											)
										}
									>
										Move to Applied
									</Badge>
								)}
							{status === "interview" &&
								application.interviewDate &&
								describeDate(application.interviewDate) ===
									"Interview date has passed" && (
									<Badge
										variant={"outline"}
										className="hidden lg:inline-block border text-nowrap rounded-sm cursor-pointer bg-green-100/30 text-green-600 border-green-200 transition tabular-nums font-normal"
										onClick={() =>
											moveApplication(
												application.id,
												"applied"
											)
										}
									>
										Got Offer
									</Badge>
								)}
							<Badge
								variant={"outline"}
								className="hidden xl:inline-block border rounded-sm bg-cyan-100/30 text-cyan-600 border-sky-200 tabular-nums font-normal"
							>
								{application.location}, {application.country}
							</Badge>
							{/* <Badge
								variant={"outline"}
								className={`hidden sm:inline-block border w-fit rounded-sm text-center font-normal ${
									application.type === "onsite"
										? "hidden sm:hidden bg-purple-100/30 text-purple-600 border-purple-200"
										: application.type === "remote"
										? "bg-green-100/30 text-green-600 border-green-200"
										: "bg-green-100/30 text-green-600 border-green-200"
								}`}
							>
								{application.type === "onsite"
									? "Onsite"
									: application.type === "remote"
									? "Remote"
									: "Hybrid"}
							</Badge> */}
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

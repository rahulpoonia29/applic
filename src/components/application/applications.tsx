"use client";

import { FileArchive } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { JobApplication } from "@prisma/client";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";
import { isPast } from "date-fns";
import BadgeButton from "../badge";
import daysToInterview from "@/lib/daysToInterview";
import { useMediaQuery } from "usehooks-ts";
import statusActions from "@/lib/statusActions";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

type Props = {
	applications: JobApplication[];
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
};

function Applications({ applications, status }: Props) {
	const { onOpen } = useModal();
	const { moveApplication } = useApplication();
	const isMobile = useMediaQuery("(max-width: 640px)");
	const router = useRouter();

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
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								router.push(
									`/application?id=${application.id}`,
								);
							}
						}}
						className="flex cursor-pointer items-center justify-between space-x-4 px-2 py-2 text-sm text-neutral-700 sm:px-4 sm:py-3 xl:pr-4"
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
						<div className="flex h-full items-center justify-center space-x-2">
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
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger
										onClick={() =>
											onOpen("archive-application", {
												applicationId: application.id,
											})
										}
									>
										<Badge
											variant={"outline"}
											className={
												"group cursor-pointer select-none text-nowrap rounded-sm border border-neutral-200 bg-neutral-100/30 font-normal tabular-nums text-neutral-600 transition-colors hover:border-teal-200 hover:bg-teal-300/10 hover:text-teal-700"
											}
										>
											<FileArchive className="size-4 text-neutral-500 group-hover:text-teal-500" />
										</Badge>
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
				))}
		</div>
	);
}

export default Applications;

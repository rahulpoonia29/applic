import React from "react";
import { Badge } from "../ui/badge";
import { FileX, SquareArrowUpRight } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export type Application = {
	posting_link: string;
	role: string;
	company: string;
	salary: number;
	type: "onsite" | "remote" | "hybrid";
	location: string;
	country: string;
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
};
type Props = {
	applications: Application[];
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
};

function Applications({ applications, status }: Props) {
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
					className="px-2 sm:px-4 xl:px-6 py-2 sm:py-3 space-x-4 flex items-center justify-between text-sm text-neutral-700"
				>
					<div className="flex items-center justify-center space-x-3">
						<Badge
							variant={"outline"}
							className="border rounded-sm text-center line-clamp-1 text-nowrap bg-orange-100/30 text-orange-600 border-orange-200 tabular-nums font-normal"
						>
							{(application.salary / 100000).toFixed(2)} LPU
						</Badge>
						<span className="font-semiold font-medium line-clamp-1 text-neutral-700">
							{application.role}, {application.company}
						</span>
					</div>
					<div className="flex items-center justify-center space-x-4 xl:space-x-6">
						<div className="flex items-center justify-center space-x-3">
							{status === "bookmarked" && (
								<Badge
									variant={"outline"}
									className="hidden lg:inline-block border text-nowrap rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 tabular-nums font-normal"
								>
									Move to Applied
								</Badge>
							)}
							{status === "applied" && (
								<>
									<Badge
										variant={"outline"}
										className="hidden x lg:inline-block text-nowrap w-fit border rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 font-normal"
									>
										Move to Bookmarked
									</Badge>
									<Badge
										variant={"outline"}
										className="hidden lg:inline-block text-nowrap w-fit border rounded-sm cursor-pointer bg-neutral-100/30 text-neutral-600 border-neutral-200 hover:bg-neutral-200/50 hover:border-neutral-300 transition hover:text-gray-700 font-normal"
									>
										Move to Interview Scheduled
									</Badge>
								</>
							)}
							<Badge
								variant={"outline"}
								className="hidden xl:inline-block border rounded-sm bg-cyan-100/30 text-cyan-600 border-sky-200 tabular-nums font-normal"
							>
								{application.location}, {application.country}
							</Badge>
							<Badge
								variant={"outline"}
								className={`hidden sm:inline-block border w-16 rounded-sm text-center font-normal ${
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
						</div>
						<div className="flex items-center justify-center space-x-3 sm:space-x-2">
							<TooltipProvider delayDuration={300}>
								<Tooltip>
									<TooltipTrigger asChild>
										<SquareArrowUpRight className="size-5 md:size-4 cursor-pointer text-gray-400 z-10 hover:text-blue-500 transition" />
									</TooltipTrigger>
									<TooltipContent
										sideOffset={6}
										className="mr-5"
										asChild
									>
										<p>Info</p>
									</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<FileX className="size-5 md:size-4 cursor-pointer text-gray-400 z-10 hover:text-red-500 transition" />
									</TooltipTrigger>
									<TooltipContent
										sideOffset={6}
										className="mr-5"
										asChild
									>
										<p>
											{status === "bookmarked"
												? "Delete"
												: "Move to Trash"}
										</p>
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

'use client'

import { Loader2, LucideIcon } from "lucide-react";
import React from "react";
import Applications from "./Applications";
import { JobApplication } from "@prisma/client"; 

type Props = {
	icon: LucideIcon;
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
	count: number;
	applications: JobApplication[];
	loading: boolean;
};

function ApplicationGroup({
	icon: Icon,
	status,
	count,
	applications,
	loading,
}: Props) {
	return (
		<div className="space-y-3 w-full">
			<div className="flex ml-2 items-center justify-start gap-3 text-gray-700 font-semibold">
				<Icon className="size-4" strokeWidth={2} />
				<span className="capitalize text-sm">
					{status === "bookmarked"
						? "Bookmarked"
						: status === "applied"
						? "Applied"
						: status === "interview"
						? "Interview Scheduled"
						: status === "offer"
						? "Offer"
						: "Rejected"}
				</span>
				<span className="border tabular-nums size-5 flex items-center justify-center rounded-sm text-xs text-gray-500 border-gray-400/50">
					{loading ? (
						<Loader2 className="size-3 animate-spin" />
					) : (
						count
					)}
				</span>
			</div>
			{loading ? (
				<div className="bg-white border divide-neutral-200 w-full divide-y rounded-lg">
					<div className="px-6 py-3 space-x-4 flex items-center justify-between text-sm text-neutral-700">
						<div className="flex items-center justify-center space-x-4">
							<span className="font-semiold font-medium line-clamp-1 text-neutral-700">
								Loading...
							</span>
						</div>
					</div>
				</div>
			) : (
				<Applications applications={applications} status={status} />
			)}
		</div>
	);
}

export default ApplicationGroup;

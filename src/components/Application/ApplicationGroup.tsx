import { Bookmark, LucideIcon } from "lucide-react";
import React from "react";
import Applications from "./Applications";
import { JobApplication } from "@/store/useApplication";

type Props = {
	icon: LucideIcon;
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
	count: number;
	applications: JobApplication[];
};

function ApplicationGroup({ icon: Icon, status, count, applications }: Props) {
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
					{count}
				</span>
			</div>
			<Applications applications={applications} status={status} />
		</div>
	);
}

export default ApplicationGroup;

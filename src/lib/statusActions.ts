import { JobApplication, JobStatus } from "@prisma/client";
import { isPast } from "date-fns";

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

export default statusActions;

import ApplicationGroup from "@/components/Application/ApplicationGroup";
import { Application } from "@/components/Application/Applications";
import { Bookmark, Calendar, CalendarCheck, CircleFadingPlus } from "lucide-react";
import React from "react";

type Props = {};

const applications: Application[] = [
	{
		posting_link: "https://www.google.com",
		role: "Software Engineer",
		company: "Google",
		salary: 3000000,
		type: "remote",
		location: "Mountain View",
		country: "USA",
		status: "bookmarked",
	},
	{
		posting_link: "https://www.facebook.com",
		role: "Software Engineer",
		company: "Facebook",
		salary: 1201658,
		type: "onsite",
		location: "Menlo Park",
		country: "USA",
		status: "bookmarked",
	},
	{
		posting_link: "https://www.apple.com",
		role: "Software Engineer",
		company: "Apple",
		salary: 1100000,
		type: "hybrid",
		location: "Cupertino",
		country: "USA",
		status: "bookmarked",
	},
	{
		posting_link: "https://www.microsoft.com",
		role: "Software Engineer",
		company: "Microsoft",
		salary: 1050000,
		type: "remote",
		location: "Redmond",
		country: "USA",
		status: "bookmarked",
	},
	{
		posting_link: "https://www.amazon.com",
		role: "Software Engineer",
		company: "Amazon",
		salary: 1150000,
		type: "onsite",
		location: "Seattle",
		country: "USA",
		status: "bookmarked",
	},
	{
		posting_link: "https://www.netflix.com",
		role: "Software Engineer",
		company: "Netflix",
		salary: 1250000,
		type: "remote",
		location: "Los Gatos",
		country: "USA",
		status: "applied",
	},
];

function page({}: Props) {
	return (
		<div className="w-full h-full px-3 xl:px-10 py-4 xl:py-8 flex-col space-y-6 justify-start items-center">
			<ApplicationGroup
				icon={Bookmark}
				status="bookmarked"
				count={
					applications.filter(
						(application) => application.status === "bookmarked"
					).length
				}
				applications={applications.filter(
					(application) => application.status === "bookmarked"
				)}
			/>
			<ApplicationGroup
				icon={CircleFadingPlus}
				status="applied"
				count={
					applications.filter(
						(application) => application.status === "applied"
					).length
				}
				applications={applications.filter(
					(application) => application.status === "applied"
				)}
			/>
			<ApplicationGroup
				icon={CalendarCheck}
				status="interview"
				count={
					applications.filter(
						(application) => application.status === "interview"
					).length
				}
				applications={applications.filter(
					(application) => application.status === "interview"
				)}
			/>
			<ApplicationGroup
				icon={Bookmark}
				status="offer"
				count={
					applications.filter(
						(application) => application.status === "offer"
					).length
				}
				applications={applications.filter(
					(application) => application.status === "offer"
				)}
			/>
		</div>
	);
}

export default page;

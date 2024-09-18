"use client";

import ApplicationGroup from "@/components/application/applicationGroup";
import { useApplication } from "@/store/useApplication";
import { JobApplication } from "@prisma/client";
import {
	Bookmark,
	CalendarCheck,
	CircleFadingPlus,
	LucideIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {};

const applicationGroups: {
	icon: LucideIcon;
	status: "bookmarked" | "applied" | "interview" | "offer" | "rejected";
}[] = [
	{
		icon: Bookmark,
		status: "bookmarked",
	},
	{
		icon: CircleFadingPlus,
		status: "applied",
	},
	{
		icon: CalendarCheck,
		status: "interview",
	},
	{
		icon: Bookmark,
		status: "offer",
	},
];

function Dashboard({}: Props) {
	const loading = useApplication((state) => state.loading);
	let unarchivedApplications = useApplication(
		(state) => state.unarchivedApplications,
	);

	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	if (search) {
		unarchivedApplications = unarchivedApplications.filter(
			(app: JobApplication) => {
				const query = search.toLowerCase();
				const numericQuery = parseFloat(search);
				return (
					app.role.toLowerCase().includes(query) ||
					app.company.toLowerCase().includes(query) ||
					app.country.toLowerCase().includes(query) ||
					app.location.toLowerCase().includes(query) ||
					app.status.toLowerCase().includes(query) ||
					(!isNaN(numericQuery) &&
						parseFloat(
							(app.salary / 100000)
								.toFixed(2)
								.replace(/\.00$/, ""),
						) === numericQuery)
				);
			},
		);
	}

	const status = searchParams.get("status")?.split("+");
	const jobType = searchParams.get("jobType")?.split("+");

	return (
		<>
			<div className="h-full w-full flex-col items-center justify-start space-y-6">
				{status === null || status === undefined
					? applicationGroups.map((group) => (
							<ApplicationGroup
								key={group.status}
								icon={group.icon}
								status={group.status}
								count={
									unarchivedApplications.filter(
										(application) =>
											application.status === group.status,
									).length
								}
								applications={unarchivedApplications.filter(
									(application) =>
										application.status === group.status,
								)}
								loading={loading}
								conditions={{ type: jobType }}
							/>
						))
					: applicationGroups
							.filter((group) => status.includes(group.status))
							.map((group) => (
								<ApplicationGroup
									key={group.status}
									icon={group.icon}
									status={group.status}
									count={
										unarchivedApplications.filter(
											(application) =>
												application.status ===
												group.status,
										).length
									}
									applications={unarchivedApplications.filter(
										(application) =>
											application.status === group.status,
									)}
									loading={loading}
									conditions={{ type: jobType }}
								/>
							))}
			</div>
		</>
	);
}

export default Dashboard;

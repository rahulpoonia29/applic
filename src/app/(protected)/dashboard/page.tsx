"use client";

import ApplicationGroup from "@/components/Application/applicationGroup";
import { useApplication } from "@/store/useApplication";
import { JobApplication } from "@prisma/client";
import { Bookmark, CalendarCheck, CircleFadingPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {};

function Dashboard({}: Props) {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");
	const { loading } = useApplication();
	let { unarchivedApplications } = useApplication();
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
	return (
		<>
			<div className="h-full w-full flex-col items-center justify-start space-y-6 px-3 py-4 xl:px-10 xl:py-8">
				<ApplicationGroup
					icon={Bookmark}
					status="bookmarked"
					count={
						unarchivedApplications.filter(
							(application) =>
								application.status === "bookmarked",
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "bookmarked",
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={CircleFadingPlus}
					status="applied"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "applied",
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "applied",
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={CalendarCheck}
					status="interview"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "interview",
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "interview",
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={Bookmark}
					status="offer"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "offer",
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "offer",
					)}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Dashboard;

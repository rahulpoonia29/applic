"use client";

import ApplicationGroup from "@/components/Application/ApplicationGroup";
import { useApplication } from "@/store/useApplication";
import { Bookmark, CalendarCheck, CircleFadingPlus } from "lucide-react";

type Props = {};

function Dashboard({}: Props) {
	const { unarchivedApplications, loading } = useApplication();

	return (
		<>
			<div className="w-full h-full px-3 xl:px-10 py-4 xl:py-8 flex-col space-y-6 justify-start items-center">
				<ApplicationGroup
					icon={Bookmark}
					status="bookmarked"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "bookmarked"
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "bookmarked"
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={CircleFadingPlus}
					status="applied"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "applied"
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "applied"
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={CalendarCheck}
					status="interview"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "interview"
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "interview"
					)}
					loading={loading}
				/>
				<ApplicationGroup
					icon={Bookmark}
					status="offer"
					count={
						unarchivedApplications.filter(
							(application) => application.status === "offer"
						).length
					}
					applications={unarchivedApplications.filter(
						(application) => application.status === "offer"
					)}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Dashboard;

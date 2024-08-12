"use client";

import ApplicationGroup from "@/components/Application/ApplicationGroup";
import { useApplication } from "@/store/useApplication";
import { JobApplication } from "@/types/JobApplication";
import { Bookmark, CalendarCheck, CircleFadingPlus } from "lucide-react";
import React, { useEffect } from "react";

type Props = {};

function Dashboard({}: Props) {
	const { applications, fetchApplications, loading } = useApplication();
	useEffect(() => {
		fetchApplications();
	}, [fetchApplications]);

	return (
		<>
			<div className="w-full h-full px-3 xl:px-10 py-4 xl:py-8 flex-col space-y-6 justify-start items-center">
				<ApplicationGroup
					icon={Bookmark}
					status="bookmarked"
					count={
						applications.filter(
							(application: JobApplication) =>
								application.status === "bookmarked"
						).length
					}
					applications={applications.filter(
						(application) => application.status === "bookmarked"
					)}
					loading={loading}
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
					loading={loading}
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
					loading={loading}
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
					loading={loading}
				/>
			</div>
		</>
	);
}

export default Dashboard;

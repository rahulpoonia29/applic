"use client";

import { useEffect } from "react";
import { useApplication } from "./useApplication";

type Props = {};

function ApplicationProvider({}: Props) {
	const { fetchApplications } = useApplication();
	useEffect(() => {
		fetchApplications();
	}, [fetchApplications]);

	return null;
}
export default ApplicationProvider;

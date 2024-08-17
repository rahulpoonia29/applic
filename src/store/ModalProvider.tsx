"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "@/components/modal/interviewDetails";
import { ArchiveApplication } from "@/components/modal/archiveApplication";
import { ArchivedApplications } from "@/components/modal/archivedApplicationsModal";
import InterviewDateModal from "@/components/modal/interviewDateModal";
import ApplicationDetailsMobile from "@/components/modal/applicationDetailsMobile";

export const ModalProvider = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<NewApplicationModal />
			<ArchiveApplication />
			<ArchivedApplications />
			<InterviewDateModal />
			<ApplicationDetailsMobile />
		</>
	);
};

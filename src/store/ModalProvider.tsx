"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "@/components/modal/newApplicationnModal";
import { ArchiveApplication } from "@/components/modal/archiveApplication";
import { ArchivedApplications } from "@/components/modal/archivedApplicationsModal";
import InterviewDateModal from "@/components/modal/interviewDateModal";
import ApplicationDetailsMobile from "@/components/modal/applicationDetailsMobile";
import ClashingInterviewDatesModal from "@/components/modal/interviewClashingDates";
import NewDocumentModal from "@/components/modal/newDocumentModal";

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
			<InterviewDateModal />
			<ArchiveApplication />
			<ArchivedApplications />
			<InterviewDateModal />
			<ApplicationDetailsMobile />
			<NewApplicationModal />
			<NewDocumentModal />
			<ClashingInterviewDatesModal />
		</>
	);
};

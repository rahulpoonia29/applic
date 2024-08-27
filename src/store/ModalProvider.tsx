"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "@/components/modal/newApplicationnModal";
import { ArchiveApplication } from "@/components/modal/archiveApplication";
import { ArchivedApplications } from "@/components/modal/archivedApplicationsModal";
import InterviewDateModal from "@/components/modal/interviewDateModal";
import ApplicationDetailsMobile from "@/components/modal/applicationDetailsMobile";
import ClashingInterviewDatesModal from "@/components/modal/interviewClashingDates";
import NewDocumentModal from "@/components/modal/newDocumentModal";
import ViewDocument from "@/components/modal/viewDocument";
import { DeleteDocumentModal } from "@/components/modal/deleteDocumentModal";
import InterviewerEmailModal from "@/components/modal/set-interview-email";
import SupportModal from "@/components/modal/support";
import FeedbackModal from "@/components/modal/feedback";

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
			<ViewDocument />
			<DeleteDocumentModal />
			<InterviewerEmailModal />
			<SupportModal />
			<FeedbackModal />
		</>
	);
};

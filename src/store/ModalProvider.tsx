"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "@/components/modal/NewApplicationModal";
import { ArchiveApplication } from "@/components/modal/ArchiveApplication";
import { ArchivedApplications } from "@/components/modal/ArchivedApplicationsModal";
import InterviewDateModal from "@/components/modal/InterviewDateModal";
import ApplicationDetailsMobile from "@/components/modal/ApplicationDetailsMobile";

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

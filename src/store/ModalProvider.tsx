"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "./NewApplicationModal";
import { useModal } from "@/store/useModal";
import { ArchiveApplication } from "./ArchiveApplication";
import { ArchivedApplications } from "./ArchivedApplicationsModal";
import InterviewDateModal from "./InterviewDateModal";

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
		</>
	);
};

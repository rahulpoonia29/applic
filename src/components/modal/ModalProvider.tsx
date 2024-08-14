"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "./NewApplicationModal";
import { useModal } from "@/store/useModal";
import { ArchiveApplication } from "./ArchiveApplication";
import { ArchivedApplications } from "./ArchivedApplicationsModal";

export const ModalProvider = () => {
	const [mounted, setMounted] = useState(false);
	const { type, onClose } = useModal();
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
		</>
	);
};

"use client";

import { useEffect, useState } from "react";
import NewApplicationModal from "./NewApplicationModal";
import { useModal } from "@/store/useModal";
import { ArchiveApplication } from "./ArchiveApplication";

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
			<NewApplicationModal
				open={type === "new-application"}
				onOpenChange={onClose}
			/>
			<ArchiveApplication
				open={type === "archive-application"}
				onOpenChange={onClose}
			/>
		</>
	);
};

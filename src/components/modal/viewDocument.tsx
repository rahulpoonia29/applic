"use client";

import { useModal } from "@/store/useModal";
import { Dialog, DialogContent } from "../ui/dialog";

export default function ViewDocument() {
	const { type, onClose, isOpen, data } = useModal();
	const isModalOpen = isOpen && type === "view-document";

	const documentURL = data?.documenURL;
	if (!documentURL) return null;

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="h-[90%] w-full overflow-hidden">
				<iframe src={documentURL} width="100%" height="100%" />
			</DialogContent>
		</Dialog>
	);
}

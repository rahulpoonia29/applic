"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import NewApplicationForm from "@/components/forms/newApplication";
import { useModal } from "@/store/useModal";

export function NewApplicationModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "interview-details";

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Add Interview Details</DialogTitle>
					<DialogDescription>
						Please fill in the details below for the interview.
					</DialogDescription>
				</DialogHeader>
				<NewApplicationForm />
			</DialogContent>
		</Dialog>
	);
}

export default NewApplicationModal;

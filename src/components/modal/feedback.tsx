"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/store/useModal";
import FeedbackForm from "../forms/feedback";

export default function FeedbackModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "feedback";

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>We&apos;d love to hear your feedback</DialogTitle>
					<DialogDescription>
						Please provide your feedback to help us improve our
						platform.
					</DialogDescription>
				</DialogHeader>
				<FeedbackForm />
			</DialogContent>
		</Dialog>
	);
}

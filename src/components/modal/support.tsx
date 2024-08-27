"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/store/useModal";
import SupportForm from "../forms/support";

export default function SupportModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "support";

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Need help?</DialogTitle>
					<DialogDescription>
						Please contact us if you have any questions or need
						assistance.
					</DialogDescription>
				</DialogHeader>
				<SupportForm />
			</DialogContent>
		</Dialog>
	);
}

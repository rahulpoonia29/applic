import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import NewApplicationForm from "../forms/NewApplication";

type ModalProps = {
	open: boolean;
	onOpenChange: () => void;
};

export function NewApplicationModal({ open, onOpenChange }: ModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>New Application</DialogTitle>
					<DialogDescription>
						Add a new job application
					</DialogDescription>
				</DialogHeader>
				<NewApplicationForm />
			</DialogContent>
		</Dialog>
	);
}

export default NewApplicationModal;

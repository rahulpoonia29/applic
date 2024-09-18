import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";
import { useState } from "react";

export function ArchiveApplication() {
	const archiveApplication = useApplication(
		(state) => state.archiveApplication,
	);
	const { type, onClose, isOpen, data } = useModal();
	const isModalOpen = isOpen && type === "archive-application";
	const [loading, setLoading] = useState(false);

	return (
		<AlertDialog open={isModalOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Archive Application</AlertDialogTitle>
					<AlertDialogDescription>
						This action will archive the application. You can
						restore it later from archived applications.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							setLoading(true);

							data?.applicationId &&
								(await archiveApplication(data.applicationId));
							setLoading(false);
						}}
						disabled={loading}
					>
						{loading ? "Archiving..." : "Archive"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

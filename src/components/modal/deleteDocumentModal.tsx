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
import { useDocument } from "@/store/useDocument";
import { useModal } from "@/store/useModal";
import { useState } from "react";

export function DeleteDocumentModal() {
	const { deleteDocument } = useDocument();
	const { type, onClose, isOpen, data } = useModal();
	const isModalOpen = isOpen && type === "delete-document";
	const [loading, setLoading] = useState(false);
	const documentId = data?.documentId;

	if (!documentId) return null;

	return (
		<AlertDialog open={isModalOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Document</AlertDialogTitle>
					<AlertDialogDescription>
						This action will permanently delete the document. You
						can&apos;t undo this action.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							setLoading(true);
							await deleteDocument(documentId);
							setLoading(false);
						}}
						disabled={loading}
					>
						{loading ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

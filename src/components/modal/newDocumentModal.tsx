"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

import { useMediaQuery } from "usehooks-ts";
import { Button } from "../ui/button";
import { useModal } from "@/store/useModal";
import NewDocumentForm from "../forms/newDocument";

export default function NewDocumentModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "new-document";
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isModalOpen} onOpenChange={onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Upload Document</DialogTitle>
						<DialogDescription>
							Add a new document.
						</DialogDescription>
					</DialogHeader>
					<NewDocumentForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={isModalOpen} onOpenChange={onClose}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>New Document</DrawerTitle>
					<DrawerDescription>Add a new document.</DrawerDescription>
				</DrawerHeader>
				<NewDocumentForm />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

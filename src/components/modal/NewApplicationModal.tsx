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

import NewApplicationForm from "../forms/NewApplication";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "../ui/button";
import { useModal } from "@/store/useModal";

export function NewApplicationModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "new-application";
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isModalOpen} onOpenChange={onClose}>
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

	return (
		<Drawer open={isModalOpen} onOpenChange={onClose}>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>New Application</DrawerTitle>
					<DrawerDescription>
						Add a new job application
					</DrawerDescription>
				</DrawerHeader>
				<NewApplicationForm />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="secondary">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

export default NewApplicationModal;

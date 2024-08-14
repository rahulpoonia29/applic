import { JobApplication } from "@/types/JobApplication";
import { create } from "zustand";

export type ModalType =
	| "new-application"
	| "archive-application"
	| "archived-applications"
	| "settings"
	| "feedback"
	| "support";

interface ModalData {
	application?: JobApplication;
	applicationStatus?: string;
	applicationId?: string;
	// applications?: JobApplication[];
	// documentType?: string;
	// document?: DocumentType;
}

type useModalProps = {
	type: ModalType | null;
	data: ModalData;
	isOpen: boolean;
	title: string;
	description: string;
	onOpen: (type: ModalType, data?: ModalData) => void;
	onClose: (open?: boolean) => void;
};

export const useModal = create<useModalProps>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	title: "",
	description: "",
	onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
	onClose: (open = false) => {
		if (!open) {
			set({ isOpen: false }); // Close the modal first
			setTimeout(() => set({ type: null }), 300); // Reset type after a delay (adjust the delay as needed)
		} else {
			set({ isOpen: open });
		}
	},
}));

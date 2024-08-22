import { UploadButton } from "@/lib/uploadthing";
import { Document } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type DocumentState = {
	documents: Document[];
	fetchDocuments: () => void;
	addDocument: ({
		name,
		type,
		size,
		url,
		userId,
	}: {
		name: string;
		type: string;
		size: number;
		url: string;
		userId: string;
	}) => void;
	removeDocument: (id: string) => void;
	clearDocuments: () => void;
};

export const useDocument = create<DocumentState>((set, get) => ({
	documents: [],
	fetchDocuments: async () => {
		try {
			const response = await axios.get("/api/documents");

			set({ documents: response.data.documents });
		} catch (error) {
			toast.error("Failed to fetch documents", {
				description: "Please try again",
			});
			console.error("Failed to fetch documents:", error);
		}
	},
	addDocument: async (document) => {
		try {
			const response = await axios.post("/api/add-document", document);

			set((state) => {
				const documents = [...state.documents, response.data.document];

				return {
					...state,
					documents,
				};
			});
			if (response.status === 200) {
				toast.success("Document added successfully");
			} else {
				throw new Error("Failed to add document");
			}
		} catch (error) {
			toast.error("Failed to add document", {
				description: "Please add the document again",
			});
			console.error("Failed to add document:", error);
			set((state) => {
				state.fetchDocuments();
				return state;
			});
		}
	},
	removeDocument: (id: string) => {},
	clearDocuments: () => {},
}));

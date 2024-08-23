import { Document } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type DocumentState = {
	documents: Document[];
	loading: boolean;
	fetchDocuments: () => void;
	addDocument: (document: {
		name: string;
		type: string;
		size: number;
		url: string;
		userId: string;
	}) => void;
	deleteDocument: (id: number) => void;
};

export const useDocument = create<DocumentState>((set) => ({
	documents: [],
	loading: true,

	// Fetch documents from the server
	fetchDocuments: async () => {
		set({ loading: true });

		try {
			const response = await axios.get("/api/documents");
			if (response.status !== 200) {
				throw new Error("Failed to fetch documents");
			}

			set({ documents: response.data.documents });
		} catch (error) {
			toast.error("Failed to fetch documents", {
				description: "Please try again",
			});
			console.error("Error fetching documents:", error);
		} finally {
			set({ loading: false });
		}
	},

	// Add a new document
	addDocument: async (document) => {
		try {
			const response = await axios.post("/api/add-document", document);

			if (response.status !== 200) {
				throw new Error("Failed to add document");
			}

			const modifieddocument = response.data.document;

			set((state) => ({
				documents: [...state.documents, modifieddocument],
			}));

			toast.success("Document added successfully");
		} catch (error) {
			toast.error("Failed to add document", {
				description: "Please try again",
			});
			console.error("Error adding document:", error);
		}
	},

	// Delete a document by ID
	deleteDocument: async (id) => {
		try {
			const response = await axios.delete(
				`/api/delete-document?documentId=${id}`,
			);

			if (response.status !== 200) {
				throw new Error("Failed to delete document");
			}

			set((state) => ({
				documents: state.documents.filter((doc) => doc.id !== id),
			}));

			toast.success("Document deleted successfully");
		} catch (error) {
			toast.error("Failed to delete document", {
				description: "Please try again",
			});
			console.error("Error deleting document:", error);
		}
	},
}));

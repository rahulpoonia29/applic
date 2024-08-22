import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

type Document = {
	file: File;
	id: string; // You can use a unique identifier for each document
};

type DocumentState = {
	documents: Document[];
	uploadStatus: string;
	addDocument: (file: File) => void;
	removeDocument: (id: string) => void;
	clearDocuments: () => void;
	uploadDocuments: () => void;
};

export const useDocument = create<DocumentState>((set, get) => ({
	documents: [],
	uploadStatus: "",
	addDocument: (file: File) => {
		const id = Date.now().toString(); // Unique ID for each document
		set((state) => ({
			documents: [...state.documents, { file, id }],
		}));
	},
	removeDocument: (id: string) => {
		set((state) => ({
			documents: state.documents.filter((doc) => doc.id !== id),
		}));
	},
	clearDocuments: () => set({ documents: [], uploadStatus: "" }),
	uploadDocuments: async () => {
		const { documents } = get();
		if (documents.length === 0) {
			toast.error("No documents selected.");
			return;
		}

		const formData = new FormData();
		documents.forEach((doc) => {
			formData.append("files", doc.file, doc.file.name);
		});

		try {
			const response = await axios.post(
				"/api/upload/documentUploader",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			toast.success(`Upload successful: ${response.data.uploadedBy}`);
			set({
				uploadStatus: `Upload successful: ${response.data.uploadedBy}`,
			});
		} catch (error) {
			toast.error(
				`Upload failed: ${error.response?.data?.message || error.message}`,
			);
			set({
				uploadStatus: `Upload failed: ${error.response?.data?.message || error.message}`,
			});
		}
	},
}));

import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

// Define the state and actions for your document store
type DocumentState = {
	document: File | null;
	uploadStatus: string;
	setDocument: (file: File) => void;
	clearDocument: () => void;
	uploadDocument: () => void;
};

export const useDocument = create<DocumentState>((set) => ({
	document: null,
	uploadStatus: "",
	setDocument: (file: File) => set({ document: file }),
	clearDocument: () => set({ document: null, uploadStatus: "" }),
	uploadDocument: async () => {
		const { document } = get();
		if (!document) {
			toast.error("No document selected.");
			return;
		}

		const formData = new FormData();
		formData.append("file", document);

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
		} catch (error: any) {
			toast.error(
				`Upload failed: ${error.response?.data?.message || error.message}`,
			);
			set({
				uploadStatus: `Upload failed: ${error.response?.data?.message || error.message}`,
			});
		}
	},
}));

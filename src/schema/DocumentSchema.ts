import z from "zod";

const DocumentSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required.",
	}),
	document: z.object({
		name: z.string().min(1, { message: "Document name is required." }),
		type: z.string().min(1, { message: "Document type is required." }),
		size: z.number().min(1, { message: "Document size is required." }),
		url: z.string().url({
			message: "Please upload a valid document URL.",
		}),
		userId: z.string().min(1, {
			message: "User ID is required.",
		}),
	}),
});

export default DocumentSchema;

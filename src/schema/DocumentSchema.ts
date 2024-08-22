import z from "zod";

const DocumentSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required.",
	}),
	document: z.string({ message: "Please upload a valid document String." }).url({
		message: "Please upload a valid document URL.",
	}),
});

export default DocumentSchema;

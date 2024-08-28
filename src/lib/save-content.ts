import { Prisma } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";

export default async function onContentSave(
	applicationId: number,
	userContent: Prisma.InputJsonValue,
) {
	try {
		const response = await axios.post("/api/save-content", {
			applicationId,
			userContent,
		});

		if (response.status === 200) {
			toast.success("Content saved successfully", {
				description:
					"Your content has been saved successfully. You can continue editing it later.",
			});
		} else {
			throw new Error(
				response.data.error || "An unexpected error occurred",
			);
		}
	} catch (error: any) {
		// Check if the error has a response object with data
		const errorMessage =
			error.response?.data?.error ||
			error.message ||
			"Failed to save content";

		toast.error("Failed to submit feedback", {
			description: errorMessage,
		});
	}
}

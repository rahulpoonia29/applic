import { isValid } from "date-fns";
import { z } from "zod";

const InterviewDetailsSchema = z.object({
	interviewDate: z
		.date({
			message: "Interview date is required",
		})
		.refine((date) => isValid(date), "Invalid date format"),
	interviewers: z
		.array(
			z.object({
				name: z
					.string({ message: "Interviewer name is required" })
					.nonempty("Interviewer name is required"),
				role: z.string().min(1, "Role is required"),
				// .optional(),
				contactInfo: z.string().email("Invalid email format"),
				linkedInProfile: z.string().url("Invalid URL"),
			}),
		)
		.optional(),
	interviewFormat: z.enum(["Virtual", "In-Person"]),
	platformOrLocation: z.string().optional(),
	preparationNotes: z.array(z.string()),
	followUpPlan: z
		.object({
			reminderDate: z
				.string()
				.optional()
				.refine(
					(date) => !isNaN(Date.parse(date || "")),
					"Invalid date format",
				)
				.nullable(),
			emailTemplate: z.string().optional().nullable(),
		})
		.optional(),
	// importantDates: z
	// 	.array(
	// 		z.object({
	// 			description: z.string().nonempty("Description is required"),
	// 			date: z
	// 				.string()
	// 				.nonempty("Date is required")
	// 				.refine(
	// 					(date) => !isNaN(Date.parse(date)),
	// 					"Invalid date format",
	// 				),
	// 		}),
	// 	)
	// 	.optional(),
	// interviewOutcome: z
	// 	.object({
	// 		status: z.enum([
	// 			"Pending",
	// 			"Accepted",
	// 			"Rejected",
	// 			"Further Rounds",
	// 		]),
	// 		notes: z.string().optional(),
	// 	})
	// 	.optional(),
	additionalContacts: z
		.array(
			z.object({
				name: z.string().nonempty("Contact name is required"),
				role: z.string().optional(),
				contactInfo: z
					.string()
					.email("Invalid email format")
					.optional(),
			}),
		)
		.optional(),
	logistics: z
		.object({
			travelArrangements: z.string().optional(),
			parkingInfo: z.string().optional(),
			directions: z.string().optional(),
			expenses: z
				.array(
					z.object({
						description: z
							.string()
							.nonempty("Expense description is required"),
						amount: z.number().min(0, "Amount must be positive"),
						submitted: z.boolean().optional(),
					}),
				)
				.optional(),
		})
		.optional(),
	updatedJobDetails: z
		.object({
			role: z.string().optional(),
			companyCultureNotes: z.string().optional(),
			teamDynamics: z.string().optional(),
			jobExpectations: z.string().optional(),
		})
		.optional(),
	interviewFeedback: z.string().optional(),
});

export default InterviewDetailsSchema;

import z from "zod";

const JobApplicationSchema = z.object({
	posting_link: z.string().url({
		message: "Invalid URL.",
	}),
	role: z.string().min(1, {
		message: "Role is required.",
	}),
	company: z.string().min(1, {
		message: "Company is required.",
	}),
	salary: z.object({
		currency: z.string({
			message: "Currency is required.",
		}),
		amount: z
			.number({
				message: "Amount is required.",
			})
			.min(1, {
				message: "Amount must be greater than 0.",
			}),
	}),
	type: z.enum(["onsite", "remote", "hybrid"]),
	location: z.string({ message: "Location is required." }),
	country: z.string({
		message: "Country is required.",
	}),
	status: z.enum([
		"bookmarked",
		"applied",
		"interview",
		"offer",
		"rejected",
		"archived",
	]),
});

export default JobApplicationSchema;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useModal } from "@/store/useModal";

const FeedbackSchema = z.object({
	feedbackCategory: z.string().min(1, "Please select an issue category."),
	subject: z.string().min(10, "Subject must be at least 10 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters."),
});

export default function FeedbackForm() {
	const [loading, setLoading] = useState(false);
	const { onClose } = useModal();

	const form = useForm<z.infer<typeof FeedbackSchema>>({
		resolver: zodResolver(FeedbackSchema),
		defaultValues: {
			feedbackCategory: "",
			subject: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof FeedbackSchema>) {
		setLoading(true);
		try {
			const response = await axios.post("/api/feedback", values);

			if (response.status === 200) {
				toast.success("Feedback submitted successfully", {
					description:
						"Thank you for your feedback! We'll review it shortly.",
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
				"Failed to submit feedback request";

			toast.error("Failed to submit feedback", {
				description: errorMessage,
			});
		} finally {
			setLoading(false);
			form.reset();
			onClose();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="feedbackCategory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Feedback Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="general">
											General Feedback
										</SelectItem>
										<SelectItem value="feature">
											Feature Request
										</SelectItem>
										<SelectItem value="uiux">
											UI/UX Improvement
										</SelectItem>
										<SelectItem value="content">
											Content Suggestions
										</SelectItem>
										<SelectItem value="performance">
											Performance Issues
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Brief summary of your feedback"
									type="text"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Share your thoughts and suggestions"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full select-none"
					disabled={loading}
				>
					{loading ? "Submitting..." : "Submit Feedback"}
				</Button>
			</form>
		</Form>
	);
}

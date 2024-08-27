"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const FeedbackSchema = z.object({
	feedbackCategory: z.string().min(1, "Please select an issue category."),
	subject: z.string().min(10, "Subject must be at least 10 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters."),
});

export default function FeedbackForm() {
	const [loading, setLoading] = useState(false);

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
		// Handle form submission here
		console.log(values);
		setLoading(false);
		form.reset();
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

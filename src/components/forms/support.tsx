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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const SupportSchema = z.object({
	issueCategory: z.string().min(1, "Please select an issue category."),
	subject: z.string().min(10, "Subject must be at least 10 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters."),
});

export default function SupportForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof SupportSchema>>({
		resolver: zodResolver(SupportSchema),
		defaultValues: {
			issueCategory: "",
			subject: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SupportSchema>) {
		setLoading(true);
		// Handle form submission here
		console.log(values);
		setLoading(false);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-3 p-4"
			>
				<FormField
					control={form.control}
					name="issueCategory"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Issue Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="bug">
											Bug Report
										</SelectItem>
										<SelectItem value="account">
											Account Issue
										</SelectItem>
										<SelectItem value="payment">
											Payment Problem
										</SelectItem>
										<SelectItem value="feature">
											Feature Request
										</SelectItem>
										<SelectItem value="general">
											General Inquiry
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
									placeholder="Brief summary of your issue"
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
									placeholder="Describe your issue in detail"
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
					{loading ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}

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
import { LoaderCircle } from "lucide-react";
import JobApplicationSchema from "@/schema/JobApplication";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useModal } from "@/store/useModal";
import { useApplication } from "@/store/useApplication";

export default function NewApplicationForm() {
	const { addApplication } = useApplication();
	const [loading, setLoading] = useState(false);
	const { onClose } = useModal();

	// Exclude archived, interview, offer, and rejected statuses
	const excludedStatuses = ["archived", "offer", "rejected"];

	const form = useForm<z.infer<typeof JobApplicationSchema>>({
		resolver: zodResolver(JobApplicationSchema),
		defaultValues: {
			posting_link: "",
			role: "",
			company: "",
			salary: "",
			country: "",
			location: "",
			type: "onsite",
			status: undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof JobApplicationSchema>) {
		setLoading(true);
		await addApplication(values);
		setLoading(false);
		onClose();
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 p-4"
			>
				<div className="space-y-2">
					<div className="grid grid-cols-2 gap-2 items-center">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="posting_link"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Posting Link</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="https://www.linkedin.com/jobs/..."
												type="text"
												className="w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex-1">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Application Status
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full ">
													<SelectValue
														placeholder="Select Status"
														className=""
													/>
												</SelectTrigger>
												<SelectContent>
													{JobApplicationSchema.shape.status.options
														.filter(
															(status) =>
																!excludedStatuses.includes(
																	status
																)
														)
														.map(
															(status, index) => (
																<SelectItem
																	key={index}
																	value={
																		status
																	}
																	className="capitalize"
																>
																	{status
																		.charAt(
																			0
																		)
																		.toUpperCase() +
																		status.slice(
																			1
																		)}
																</SelectItem>
															)
														)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex gap-2 items-center">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Backend Developer"
												type="text"
												className="w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="company"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Google"
												type="text"
												className="w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex gap-2 items-center">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="salary"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Salary{" "}
											<span className="text-gray-400 font-normal">
												(Per Annum)
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Rs. 28,00,000"
												type="number"
												className="w-full"
												min={0}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Work Type</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full ">
													<SelectValue
														placeholder="Select Type"
														className="capatilize"
													/>
												</SelectTrigger>
												<SelectContent>
													{JobApplicationSchema.shape.type.options.map(
														(type, index) => (
															<SelectItem
																key={index}
																value={type}
																className="capitalize"
															>
																{type
																	.charAt(0)
																	.toUpperCase() +
																	type.slice(
																		1
																	)}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex gap-2 items-center">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Hyderabad"
												type="text"
												className="w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="India"
												type="text"
												className="w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full select-none"
					disabled={loading}
				>
					{loading ? (
						<div className="flex items-center justify-center space-x-1.5">
							<LoaderCircle className="h-4 w-4 animate-spin" />
							<span>Please wait...</span>
						</div>
					) : (
						"Submit Application"
					)}
				</Button>
			</form>
		</Form>
	);
}

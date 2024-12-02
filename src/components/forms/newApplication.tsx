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
import JobApplicationSchema from "@/schema/JobApplication";
import { useApplication } from "@/store/useApplication";
import { useModal } from "@/store/useModal";
import { LoaderCircle } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function NewApplicationForm() {
	const addApplication = useApplication((state) => state.addApplication);
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
			salary: {
				amount: undefined,
				currency: "USD",
			},
			country: "",
			location: "",
			type: "onsite",
			status: undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof JobApplicationSchema>) {
		setLoading(true);
		console.log(values);

		await addApplication(values);
		setLoading(false);
		onClose();
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
				<div className="space-y-2">
					<div className="grid grid-cols-2 items-center gap-2">
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
												className="shadow-none"
												placeholder="linkedin.com/jobs/..."
												type="text"
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
										<FormLabel>Application Status</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder="Select Status"
														className=""
													/>
												</SelectTrigger>
												<SelectContent>
													{JobApplicationSchema.shape.status.options
														.filter(
															(status) => !excludedStatuses.includes(status),
														)
														.map((status, index) => (
															<SelectItem
																key={index}
																value={status}
																className="capitalize"
															>
																{status.charAt(0).toUpperCase() +
																	status.slice(1)}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
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

					<div className="flex items-center gap-2">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="salary"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Salary{" "}
											<span className="font-normal text-gray-400">
												(Per Annum)
											</span>
										</FormLabel>

										<FormControl>
											<div className="flex rounded-lg shadow-sm shadow-black/5">
												<Select
													value={field.value.currency}
													onValueChange={(value) => {
														field.onChange({
															...field.value,
															currency: value,
														});
													}}
												>
													<SelectTrigger className="peer inline-flex w-fit appearance-none items-center rounded-none rounded-s-lg border border-input bg-background text-sm text-muted-foreground transition-shadow hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
														<SelectValue
															placeholder="Currency"
															className="capatilize"
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="USD">USD</SelectItem>
														<SelectItem value="INR">INR</SelectItem>
														<SelectItem value="EUR">EUR</SelectItem>
													</SelectContent>
												</Select>
												<Input
													onChange={(e) => {
														field.onChange({
															...field.value,
															amount: Number(e.target.value),
														});
													}}
													value={field.value.amount}
													className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
													placeholder="28,00,000"
													type="number"
												/>
											</div>
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
												<SelectTrigger className="w-full">
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
																{type.charAt(0).toUpperCase() + type.slice(1)}
															</SelectItem>
														),
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

					<div className="flex items-center gap-2">
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

				<Button type="submit" className="w-full select-none" disabled={loading}>
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

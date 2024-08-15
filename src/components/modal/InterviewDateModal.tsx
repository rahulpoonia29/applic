"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { useModal } from "@/store/useModal";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const FormSchema = z.object({
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	sendEmail: z.boolean().default(false).optional(),
});

export default function InterviewDateModal() {
	const { type, onClose, isOpen } = useModal();
	const isModalOpen = isOpen && type === "set-interview-date";
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
            
        } catch (error) {
            
        }
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Set Interview Date</DialogTitle>
					<DialogDescription>
						Please select the date of the interview.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="dob"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"pl-3 text-left font-normal flex justify-start gap-3",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													<CalendarIcon className="h-4 w-4 opacity-50" />
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													// Disable dates before today and after 2 years from today
													date <
														new Date(
															new Date().getFullYear(),
															new Date().getMonth(),
															new Date().getDate()
														) ||
													date >
														new Date(
															new Date().getFullYear() +
																2,
															new Date().getMonth(),
															new Date().getDate()
														)
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sendEmail"
							render={({ field }) => (
								<FormItem className="flex flex-col ml-0.5">
									<FormControl>
										<div className="flex items-center space-x-2">
											<Checkbox
												id="email"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											<label
												htmlFor="email"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
											>
												Send reminder email a day before
												the interview.
											</label>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" className="w-full">
								{loading ? "Submitting..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

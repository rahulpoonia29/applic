"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import SetInterviewerEmail from "@/actions/setInterviewerEmail";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/store/useModal";
import { useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useApplication } from "@/store/useApplication";

const FormSchema = z.object({
	interviewerEmail: z
		.string({
			message: "Interview email is required",
		})
		.email({
			message: "Invalid email address",
		}),
});

export default function InterviewerEmailModal() {
	const { type, onClose, isOpen, data } = useModal();
	const { setInterviewerEmail } = useApplication();
	const applicationId = data.applicationId;
	const isModalOpen = isOpen && type === "set-interview-email";
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			interviewerEmail: "",
		},
	});

	async function onSubmit(formData: z.infer<typeof FormSchema>) {
		setLoading(true);
        // @ts-ignore
		await setInterviewerEmail(formData.interviewerEmail, applicationId);
		setLoading(false);
		onClose();
		form.reset();
	}

	if (!applicationId) {
		return null;
	}

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={() => {
				form.reset();
				onClose();
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Set Interviewer Email</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="interviewerEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Interviewer Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="jhon@example.com"
											type="text"
											className="w-full"
										/>
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

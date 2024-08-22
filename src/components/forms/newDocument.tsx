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
import { useModal } from "@/store/useModal";
import { useDocument } from "@/store/useDocument";
import DocumentSchema from "@/schema/DocumentSchema";

export default function NewDocumentForm() {
	const { addDocument } = useDocument();
	const [loading, setLoading] = useState(false);
	const { onClose } = useModal();

	const form = useForm<z.infer<typeof DocumentSchema>>({
		resolver: zodResolver(DocumentSchema),
		defaultValues: {
			title: "",
			document: undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof DocumentSchema>) {
		setLoading(true);

		if (values.document) {
			// Add document to Zustand store
			addDocument(values.document);

			// Optionally, you can perform further actions here like sending the file to the server if needed
			// For example:
			// const formData = new FormData();
			// formData.append("file", values.document);
			// await axios.post('/api/upload/documentUploader', formData);

			// Reset form and close modal
			form.reset();
			onClose();
		}

		setLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 p-4"
			>
				<div className="space-y-2">
					<div className="flex-1">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="File Title"
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
							name="document"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Document
										<span className="text-sm text-gray-500">
											(Format must be PDF)
										</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="file"
											accept=".pdf,application/pdf"
											className="w-full"
											onChange={(e) => {
												// Handle file input change
												field.onChange(e);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						"Upload Document"
					)}
				</Button>
			</form>
		</Form>
	);
}

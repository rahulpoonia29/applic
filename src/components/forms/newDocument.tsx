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
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

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
		// async function onSubmit(values: any) {
		setLoading(true);
		console.log(values);
		onClose();
		form.reset();

		setLoading(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2">
					<FormField
						control={form.control}
						name="document"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Document{" "}
									<span className="font-normal text-gray-400">
										(Format must be PDF)*
									</span>
								</FormLabel>
								<FormControl>
									<UploadDropzone
										disabled={loading}
										endpoint="document"
										onClientUploadComplete={(res) => {
											toast.success(
												"Document uploaded successfully",
											);
											field.onChange(res[0].url);
										}}
										onUploadError={(error: Error) => {
											toast.error(
												"An error occurred while uploading the document",
												{
													description: error.message,
												},
											);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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

				<Button
					type="submit"
					className="mt-8 w-full select-none"
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

const onject = [
	{
		name: "Doc1.pdf",
		size: 204994,
		key: "0bb4727a-febe-4909-8963-d61f3c3f0c85-19rtl.pdf",
		serverData: {
			uploadedBy: "fakeId",
		},
		url: "https://utfs.io/f/0bb4727a-febe-4909-8963-d61f3c3f0c85-19rtl.pdf",
		customId: null,
		type: "application/pdf",
	},
];

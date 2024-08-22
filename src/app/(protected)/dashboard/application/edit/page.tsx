"use client";

import ApplicationInfo from "@/components/application/applicationInfo";
import { JobApplication } from "@prisma/client";
import { Pencil } from "lucide-react";
import Editor from "@/components/editor/advanced-editor";
import { useState } from "react";
import { JSONContent } from "novel";
import { defaultEditorContent } from "@/lib/default-value";

export default function Home() {
	const [value, setValue] = useState<JSONContent>(defaultEditorContent);
	const application: JobApplication = {
		id: 26,
		posting_link:
			"https://www.radix-ui.com/primitives/docs/components/dialog#api-reference",
		role: "Frontend Engineer",
		company: "Facebook",
		salary: 500000,
		type: "onsite",
		location: "Banglore",
		country: "India ",
		status: "interview",
		previousStatus: null,
		userId: "clzuqgxjv0000rw6z9f4zfd1p",
		interview: true,
		interviewDate: new Date("2024-08-16T03:30:00.000Z"),
		emailSentDate: new Date("2024-08-16T03:30:00.000Z"),
		interviewerEmail: null,
		notes: null,
		createdAt: new Date("2024-08-16T11:29:59.970Z"),
		updatedAt: new Date("2024-08-16T11:29:59.970Z"),
	};
	return (
		<main className="mb-8 flex min-h-screen w-full flex-col items-center justify-between text-gray-800">
			<div className="flex w-full flex-col gap-6">
				<ApplicationInfo application={application} />
				<div className="flex flex-col justify-between gap-4">
					<h1 className="flex items-center gap-3 text-xl font-semibold text-gray-800">
						<Pencil size={20} />
						Write about your job
					</h1>
					<Editor initialValue={value} onChange={setValue} />
				</div>
			</div>
		</main>
	);
}

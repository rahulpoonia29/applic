"use client";

import ApplicationInfo from "@/components/application/applicationInfo";
import { JobApplication } from "@prisma/client";
import { Pencil } from "lucide-react";
import Editor from "@/components/editor/advanced-editor";
import { useEffect, useState } from "react";
import { JSONContent } from "novel";
import { defaultEditorContent } from "@/lib/default-value";
import { useRouter, useSearchParams } from "next/navigation";
import { useApplication } from "@/store/useApplication";
import { useSession } from "next-auth/react";

type Props = {};

export default function EditPage({}: Props) {
	const searchParams = useSearchParams();
	const applicationId = searchParams.get("id");
	const { applications } = useApplication();
	const router = useRouter();
	const session = useSession();

	const [value, setValue] = useState<JSONContent>(defaultEditorContent);
	const [application, setApplication] = useState<JobApplication>();

	useEffect(() => {
		if (applicationId) {
			const application = applications.find(
				(application) => application.id === parseInt(applicationId),
			);
			setApplication(application);
		}
	}, [applications, applicationId]);

	return (
		<main className="mb-8 flex min-h-screen w-full flex-col items-center justify-between text-gray-800">
			<div className="flex w-full flex-col gap-6">
				{application && <ApplicationInfo application={application} />}
			</div>
		</main>
	);
}

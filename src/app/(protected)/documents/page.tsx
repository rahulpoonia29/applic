"use client";

import DocumentGroup from "@/components/document/documentGroup";
import { useApplication } from "@/store/useApplication";
import { JobApplication } from "@prisma/client";
import {
	Bookmark,
	CalendarCheck,
	CircleFadingPlus,
	FileText,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function Document({}: Props) {
	const loading = true;
	return (
		<div className="h-full w-full flex-col items-center justify-start space-y-6">
			<DocumentGroup
				icon={FileText}
				status="resume"
				// count={resumeCount}
				// documents={resumes}
				loading={loading}
			/>
			<DocumentGroup
				icon={FileText}
				status="coverLetter"
				// count={coverLetterCount}
				// documents={coverLetters}
				loading={loading}
			/>
			{/* Add more document types as needed */}
		</div>
	);
}

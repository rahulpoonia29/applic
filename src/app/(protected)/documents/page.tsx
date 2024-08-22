"use client";

import DocumentGroup from "@/components/document/documentGroup";
import { useDocument } from "@/store/useDocument";
import { FileText } from "lucide-react";

type Props = {};

export default function Document({}: Props) {
	const { loading, documents } = useDocument();
	console.log("Loading", loading, documents);

	return (
		<div className="h-full w-full flex-col items-center justify-start space-y-6">
			<DocumentGroup
				icon={FileText}
				status="resume"
				count={documents.length}
				documents={documents}
				loading={loading}
			/>
			{/* <DocumentGroup
				icon={FileText}
				status="coverLetter"
				// count={coverLetterCount}
				// documents={coverLetters}
				loading={loading}
			/> */}
			{/* Add more document types as needed */}
		</div>
	);
}

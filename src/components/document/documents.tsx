"use client";

import { useDocument } from "@/store/useDocument";
import { Document } from "@prisma/client";
import { FileDown, FileX, View } from "lucide-react";
import Link from "next/link";

type Props = {
	documents: Document[];
	status: string;
};

export default function Documents({ documents, status }: Props) {
	const { deleteDocument } = useDocument();

	if (documents.length === 0) {
		return (
			<div className="border- w-full divide-y divide-neutral-200 rounded-lg border bg-white">
				<div className="flex items-center justify-between space-x-4 px-6 py-3 text-sm text-neutral-700">
					<div className="flex items-center justify-center space-x-4">
						<span className="font-semiold line-clamp-1 font-medium text-neutral-700">
							No documents found
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="border- w-full divide-y divide-neutral-200 rounded-lg border bg-white">
			{documents
				.sort((a, b) => a.size - b.size)
				.map((document, index: number) => (
					<div
						key={index}
						className="flex items-center justify-between space-x-4 px-4 py-3 text-sm text-neutral-700 xl:pr-4"
					>
						<div className="flex items-center justify-center space-x-5">
							<span className="font-medium capitalize tabular-nums">
								{document.name}
							</span>
							<div className="flex space-x-3">
								<View className="size-4 cursor-pointer text-gray-400 transition hover:text-blue-500" />
								<Link
									href={document.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileDown className="size-4 cursor-pointer text-gray-400 transition hover:text-blue-500" />
								</Link>
							</div>
						</div>

						<FileX
							className="size-4 cursor-pointer text-gray-400 transition hover:text-red-500"
							onClick={() => deleteDocument(document.id)}
						/>
					</div>
				))}
		</div>
	);
}

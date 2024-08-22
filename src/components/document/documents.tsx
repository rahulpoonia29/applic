"use client";

import { Document } from "@prisma/client";
import BadgeButton from "../badge";

type Props = {
	documents: Document[];
	status: string;
};

export default function Documents({ documents, status }: Props) {
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
						className="flex items-center justify-between space-x-4 px-2 py-2 text-sm text-neutral-700 sm:px-4 sm:py-3 xl:pr-4"
					>
						<div className="flex items-center justify-center space-x-3">
							<span>{document.name}</span>
						</div>
						<div className="flex items-center justify-center space-x-4">
							<div className="flex items-center justify-center space-x-2"></div>
						</div>
					</div>
				))}
		</div>
	);
}

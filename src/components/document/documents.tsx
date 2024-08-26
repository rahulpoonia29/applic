"use client";

import { useDocument } from "@/store/useDocument";
import { useModal } from "@/store/useModal";
import { Document } from "@prisma/client";
import { FileDown, FileX, View } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

type Props = {
	documents: Document[];
	status: string;
};

export default function Documents({ documents }: Props) {
	const { onOpen } = useModal();

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
								<View
									className="size-4 cursor-pointer text-gray-400 transition hover:text-blue-500"
									onClick={() =>
										onOpen("view-document", {
											documenURL: document.url,
										})
									}
								/>
								<Link
									href={document.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileDown className="size-4 cursor-pointer text-gray-400 transition hover:text-blue-500" />
								</Link>
							</div>
						</div>
						<Badge
							variant={"outline"}
							className={
								"group cursor-pointer select-none text-nowrap rounded-sm border border-neutral-200 bg-neutral-100/30 font-normal tabular-nums text-neutral-600 transition-colors hover:border-red-300 hover:bg-red-300/20 hover:text-red-700"
							}
						>
							<FileX
								className="size-4 text-neutral-500 group-hover:text-red-500"
								onClick={() =>
									onOpen("delete-document", {
										documentId: document.id,
									})
								}
							/>
						</Badge>
					</div>
				))}
		</div>
	);
}

"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/store/useModal";
import { usePathname } from "next/navigation";

type Props = {};

function NewApplication({}: Props) {
	const { onOpen } = useModal();
	const pathname = usePathname();
	return (
		<Button
			variant="outline"
			className="flex h-fit gap-2 px-3 py-2 text-gray-700"
			onClick={() => {
				if (pathname === "/documents") onOpen("new-document");
				else onOpen("new-application");
			}}
		>
			<Plus className="size-4" /> New
		</Button>
	);
}

export default NewApplication;

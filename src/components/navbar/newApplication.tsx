"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useModal } from "@/store/useModal";

type Props = {};

function NewApplication({}: Props) {
	const { onOpen } = useModal();
	return (
		<Button
			variant="outline"
			className="h-fit flex gap-2 px-3 py-2 text-gray-700"
			onClick={() => onOpen("new-application")}
		>
			<Plus className="size-4" /> New
		</Button>
	);
}

export default NewApplication;

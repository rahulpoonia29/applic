"use client";

import { useApplication } from "@/store/useApplication";
import { Button } from "../ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import { ModalType, useModal } from "@/store/useModal";

type Props = {
	icon: LucideIcon;
	label: string;
	notification?: number;
	type: ModalType;
};

function SidebarItem({ icon: Icon, label, notification, type }: Props) {
	const { onOpen } = useModal();
	const { loading, archivedCount } = useApplication();

	return (
		<Button
			variant="ghost"
			className="w-full flex items-center justify-between space-x-2 select-none"
			type={"button"}
			onClick={() => {
				if (type === "new-application") {
					onOpen("new-application");
				}
				if (type === "archive-application") {
					//TODO: Archived Modal
				}
			}}
		>
			<div className="flex items-center justify-center gap-2 text-gray-700">
				<Icon className="size-4" />
				{label}
			</div>
			{type === "archive-application" &&
				(loading ? (
					<Loader2 className="size-3 animate-spin" />
				) : (
					archivedCount
				))}

			{notification && (
				<span className="text-gray-600">{notification}</span>
			)}
		</Button>
	);
}

export default SidebarItem;

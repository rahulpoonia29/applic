"use client";

import { useApplication } from "@/store/useApplication";
import { Button } from "../ui/button";
import { Loader2, LucideIcon } from "lucide-react";
import { useModal } from "@/store/useModal";

type Props = {
	icon: LucideIcon;
	label: string;
	notification?: number;
	type:
		| "new-application"
		| "archived_applications"
		| "settings"
		| "feedback"
		| "support";
};

function SidebarItem({ icon: Icon, label, notification, type }: Props) {
	const { onOpen } = useModal();
	const { loading, archivedCount } = useApplication();

	return (
		<Button
			variant="ghost"
			className="w-full flex items-center justify-between space-x-2 select-none"
			type={"button"}
			onClick={
				type === "new-application"
					? () => onOpen("new-application")
					: undefined
			}
		>
			<div className="flex items-center justify-center gap-2 text-gray-700">
				<Icon className="size-4" />
				{label}
			</div>
			{type === "archived_applications" &&
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

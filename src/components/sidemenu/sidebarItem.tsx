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
	onClick?: () => void;
};

function SidebarItem({
	icon: Icon,
	label,
	notification,
	type,
	onClick,
}: Props) {
	const { onOpen } = useModal();
	const { loading, archivedCount } = useApplication();

	return (
		<Button
			variant="ghost"
			className="flex w-full select-none items-center justify-between space-x-2 text-gray-700"
			type={"button"}
			onClick={() => {
				if (type === "new-application") {
					onOpen("new-application");
				}
				if (type === "archived-applications") {
					onOpen("archived-applications");
				}
				if (onClick) onClick();
			}}
		>
			<div className="flex items-center justify-center gap-2 text-gray-700">
				<Icon className="size-4" />
				{label}
			</div>
			{type === "archived-applications" &&
				(loading ? (
					<Loader2 className="size-3 animate-spin" />
				) : (
					archivedCount
				))}

			{notification && (
				<span className="text-gray-700">{notification}</span>
			)}
		</Button>
	);
}

export default SidebarItem;

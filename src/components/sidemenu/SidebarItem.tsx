import React from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	label: string;
	notification?: number;
	type: "new-application" | "archived_applications" | "settings" | "feedback" | "support";
};

function SidebarItem({ icon: Icon, label, notification, type }: Props) {
	return (
		<Button
			variant="ghost"
			className="w-full flex items-center justify-between space-x-2 select-none"
			type={"button"}
		>
			<div className="flex items-center justify-center gap-2 text-gray-700">
				<Icon className="size-4" />
				{label}
			</div>
			{notification && (
				<span className="text-gray-600">{notification}</span>
			)}
		</Button>
	);
}

export default SidebarItem;

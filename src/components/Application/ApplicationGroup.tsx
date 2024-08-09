import { Bookmark, LucideIcon } from "lucide-react";
import React from "react";
import Applications from "./Applications";

type Props = {
	icon: LucideIcon;
	category: string;
	count: number;
};

function ApplicationGroup({ icon: Icon, category, count }: Props) {
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-start gap-3 text-gray-700 font-semibold">
				<Icon className="size-4" strokeWidth={3} />
				<span>{category}</span>
				<span className="border size-4 flex items-center justify-center rounded-sm text-xs text-gray-500 border-gray-400/50">
					{count}
				</span>
			</div>
			<Applications />
		</div>
	);
}

export default ApplicationGroup;

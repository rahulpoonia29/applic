import React from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";

type Props = {
	icon: LucideIcon;
	label: string;
	href: string;
};

function SidebarLink({ icon: Icon, label, href }: Props) {
	return (
		<Link href={href}>
			<Button
				variant="ghost"
				className="flex w-full select-none items-center justify-start gap-2 text-gray-700"
			>
				<Icon className="size-4" />
				{label}
			</Button>
		</Link>
	);
}

export default SidebarLink;

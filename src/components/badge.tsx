import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
	text: string;
	icon?: LucideIcon;
	className?: string;
	onClick?: () => void;
	color?: string;
	hoverColor?: string;
	hidden?: "sm" | "md" | "lg" | "xl" | "2xl";
};

const getDynamicColorClasses = (color: string, hoverColor?: string) => {
	if (hoverColor)
		return `bg-${color}-100/30 text-${color}-600 border-${color}-200 hover:bg-${hoverColor}-300/30 hover:border-${hoverColor}-300 hover:text-${hoverColor}-700 cursor-pointer`;

	return `bg-${color}-100/30 text-${color}-600 border-${color}-200`;
};

const getDynamicHiddenClasses = (hidden: string | undefined) => {
	if (!hidden) return "";
	return `hidden ${hidden}:inline-flex`;
};

export default function BadgeButton({
	text,
	icon: Icon,
	className = "",
	onClick,
	color = "blue",
	hoverColor,
	hidden,
}: Props) {
	return (
		<Badge
			variant={"outline"}
			className={cn(
				"cursor-default select-none text-nowrap rounded-sm border font-normal tabular-nums transition-colors " +
					getDynamicHiddenClasses(hidden) +
					" " +
					getDynamicColorClasses(color, hoverColor) +
					" " +
					className,
			)}
			onClick={onClick}
		>
			{Icon ? (
				<div className="flex items-center gap-1">
					<Icon className="size-3" strokeWidth={2} />
					<span className="hidden md:inline-block">{text}</span>
				</div>
			) : (
				text
			)}
		</Badge>
	);
}

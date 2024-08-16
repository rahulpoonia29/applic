import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type Props = {
	text: string;
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
				"border text-nowrap rounded-sm cursor-default transition-colors tabular-nums font-normal " +
					getDynamicHiddenClasses(hidden) +
					" " +
					getDynamicColorClasses(color, hoverColor) +
					" " +
					className
			)}
			onClick={onClick}
		>
			{text}
		</Badge>
	);
}

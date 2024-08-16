import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type Props = {
	text: string;
	className?: string;
	onClick?: () => void;
	color?: string;
};

export default function BadgeButton({
	text,
	className,
	onClick,
	color,
}: Props) {
	return (
		<Badge
			variant={"outline"}
			className={cn(
				`border text-nowrap rounded-sm cursor-default transition-colors tabular-nums font-normal ` +
					className
			)}
			onClick={onClick}
		>
			{text}
		</Badge>
	);
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ListFilter, Plus } from "lucide-react";

type Props = {};

function FilterButton({}: Props) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted)
		return (
			<Button
				size={"sm"}
				variant="ghost"
				className="border text-gray-500  font-normal px-2.5 shadow-sm"
			>
				<ListFilter className="mr-2 size-4" />
				Filter
			</Button>
		);

	return (
		<Button
			variant="outline"
			className="text-foreground flex gap-2 drop-shadow-sm text-gray-700"
		>
			<Plus className="size-4" /> New Application
		</Button>
	);
}

export default FilterButton;

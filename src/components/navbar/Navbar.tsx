import React from "react";
import { Button } from "../ui/button";
import { Circle, ListFilter, Plus } from "lucide-react";

type Props = {};

function Navbar({}: Props) {
	return (
		<div className="w-full px-3 xl:px-10 py-2 xl:py-3 border-b flex space-x-4 justify-start items-center">
			<Button
				variant="outline"
				className="text-foreground flex gap-2 drop-shadow-md text-gray-700"
			>
				<Plus className="size-4" /> New Application
			</Button>
			<Button
				variant="outline"
				className="text-foreground flex gap-2 drop-shadow-md text-gray-700"
			>
				<ListFilter className="size-4" /> Filter
			</Button>
		</div>
	);
}

export default Navbar;

"use client";

import React from "react";
import { Button } from "../ui/button";
import { ListFilter, Plus } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import MobileNavbar from "./MobileNavbar";

type Props = {};

function Navbar({}: Props) {
	const ismobile = useMediaQuery("(max-width: 768px)");

	return (
		<div className="w-full px-4 xl:px-10 py-2 xl:py-3 border-b flex gap-4 justify-start items-center">
			{ismobile ? (
				<MobileNavbar />
			) : (
				<>
					<Button
						variant="outline"
						className="text-foreground flex gap-2 drop-shadow-sm text-gray-700"
					>
						<Plus className="size-4" /> New Application
					</Button>
					<Button
						variant="outline"
						className="text-foreground flex gap-2 drop-shadow-sm text-gray-700"
					>
						<ListFilter className="size-4" /> Filter
					</Button>
				</>
			)}
		</div>
	);
}

export default Navbar;

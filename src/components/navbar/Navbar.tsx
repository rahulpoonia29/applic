"use client";

import { Button } from "../ui/button";
import { ListFilter, Plus } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import MobileNavbar from "./MobileNavbar";
import NewApplication from "./NewApplication";

type Props = {};

function Navbar({}: Props) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<nav className="w-full px-4 xl:px-10 py-2 xl:py-3 border-b z-50 flex gap-4 justify-start items-center">
			{isMobile === true ? (
				<MobileNavbar />
			) : (
				<>
					<NewApplication />
					<Button
						variant="outline"
						className="hidden md:flex text-foreground gap-2 drop-shadow-sm text-gray-700"
					>
						<ListFilter className="size-4" /> Filter
					</Button>
				</>
			)}
		</nav>
	);
}

export default Navbar;

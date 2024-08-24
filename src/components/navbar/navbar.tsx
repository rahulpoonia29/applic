"use client";

import { Button } from "../ui/button";
import { ListFilter, Plus } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import MobileNavbar from "./mobileNavbar";
import NewApplication from "./newApplication";
import { ThemeToggle } from "../theme-toggle";


type Props = {};

function Navbar({}: Props) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<nav className="z-50 flex w-full items-center bg-white justify-start gap-4 border-b px-4 py-2 xl:px-10 xl:py-3">
			{isMobile === true ? (
				<MobileNavbar />
			) : (
				<>
					<NewApplication />
					<Button
						variant="outline"
						className="hidden h-fit gap-2 px-3 py-2 text-sm md:flex"
					>
						<ListFilter className="size-4" /> Filter
					</Button>
					{/* <ThemeToggle /> */}
				</>
			)}
		</nav>
	);
}

export default Navbar;

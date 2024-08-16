"use client";

import { Button } from "../ui/button";
import { ListFilter, Plus } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import MobileNavbar from "./MobileNavbar";
import NewApplication from "./NewApplication";
import { ModeToggle } from "../theme/themeToggle";

type Props = {};

function Navbar({}: Props) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	return (
		<nav className="z-50 flex w-full items-center justify-start gap-4 border-b px-4 py-2 xl:px-10 xl:py-3">
			{isMobile === true ? (
				<MobileNavbar />
			) : (
				<>
					<NewApplication />
					<Button
						variant="outline"
						className="hidden gap-2 px-3 text-sm text-foreground text-gray-700 md:flex"
					>
						<ListFilter className="size-4" /> Filter
					</Button>
					{/* <ModeToggle /> */}
				</>
			)}
		</nav>
	);
}

export default Navbar;

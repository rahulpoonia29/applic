"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { FilterButton } from "../filter-button";
import { Skeleton } from "../ui/skeleton";
import MobileNavbar from "./mobileNavbar";
import NewApplication from "./newApplication";

type Props = {};

function Navbar({}: Props) {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<nav className="z-50 flex w-full items-center justify-start gap-4 border-b bg-white px-4 py-2 xl:px-10 xl:py-3">
				<Skeleton className="h-10 w-full" />
			</nav>
		);
	}

	return (
		<nav className="z-50 flex w-full items-center justify-start gap-4 border-b bg-white px-4 py-2 xl:px-10 xl:py-3">
			{isMobile && isMobile === true ? (
				<MobileNavbar />
			) : (
				<>
					<NewApplication />
					<FilterButton />
					{/* <ThemeToggle /> */}
				</>
			)}
		</nav>
	);
}

export default Navbar;

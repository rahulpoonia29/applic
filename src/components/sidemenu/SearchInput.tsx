"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTimeout } from "usehooks-ts";

type Props = {
	className?: string;
};

function SearchInput({ className }: Props) {
	const [searchValue, setSearchValue] = useState<string>("");
	const router = useRouter();
	const pathName = usePathname();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const params = new URLSearchParams(window.location.search);

			if (searchValue) {
				params.set("search", searchValue);
			} else {
				params.delete("search"); // Remove the param if search is empty
			}

			// Push the updated URL with new query parameters
			router.push(`?${params.toString()}`);
		}, 200);

		// Cleanup timeout if the component unmounts or searchValue changes before the timeout finishes
		return () => clearTimeout(timeoutId);
	}, [searchValue, pathName, router]);

	return (
		<div
			className={cn(
				"flex items-center rounded-md border border-input bg-accent text-foreground px-3 py-2 space-x-2 focus-within:ring-2 focus-within:ring-blue-500 my-1",
				className
			)}
		>
			<Search className="text-muted-foreground size-4" />
			<Input
				placeholder="Search"
				className="border-none text-gray-700 bg-transparent p-0 h-fit text-sm placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
}

export default SearchInput;

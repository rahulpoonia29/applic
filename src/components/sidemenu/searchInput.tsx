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
				"my-1 flex items-center space-x-2 rounded-md border border-input bg-accent px-3 py-2 text-foreground focus-within:ring-2 focus-within:ring-blue-500",
				className,
			)}
		>
			<Search className="size-4 text-muted-foreground" />
			<Input
				placeholder="Search"
				className="h-fit border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
}

export default SearchInput;

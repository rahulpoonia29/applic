"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

function SearchInput({ className }: Props) {
	const [seachValue, setSearchValue] = useState<string>("");

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
				value={seachValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
		</div>
	);
}

export default SearchInput;

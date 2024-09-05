"use client";

import useQueryParams from "@/lib/useQueryParams";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
	className?: string;
};

function SearchInput({ className }: Props) {
	const { query, setQuery } = useQueryParams({
		search: "",
	});

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
				value={query.search}
				onChange={(e) => setQuery("search", e.target.value)}
			/>
		</div>
	);
}

export default SearchInput;

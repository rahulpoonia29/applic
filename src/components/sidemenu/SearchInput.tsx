import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

type Props = {};

function SearchInput({}: Props) {
	return (
		<div className="flex items-center rounded-md border border-input bg-accent text-foreground px-3 py-2 space-x-2">
			<Search className="text-muted-foreground size-4" />
			<Input
				placeholder="Search"
				className="border-none text-gray-700 bg-transparent p-0 h-fit text-sm placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
		</div>
	);
}

export default SearchInput;

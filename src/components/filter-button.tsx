"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FilterButton() {
	const [isOpen, setIsOpen] = useState(false);

	const filterOptions = {
		status: [
			"Saved",
			"Applied",
			"Interview",
			"Offered",
			// "Declined",
		],
		jobType: ["Onsite", "Remote", "Hybrid"],
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="flex h-fit gap-2 px-3 py-2"
				>
					{/* <Filter className="h-4 w-4" /> */}
					Filters
					<ChevronDown className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="mr-6 p-1" align="start">
				<div className="grid grid-cols-2 gap-3 p-4">
					{Object.entries(filterOptions).map(
						([category, options]) => (
							<div key={category}>
								<div className="space-y-2">
									{options.map((option) => (
										<div
											key={option}
											className="flex items-center justify-start space-x-2"
										>
											<Checkbox id={option} />
											<Label
												htmlFor={option}
												className="text-nowrap text-sm"
											>
												{option}
											</Label>
										</div>
									))}
								</div>
							</div>
						),
					)}
				</div>
				<Separator />
				<div className="flex items-center justify-between bg-gray-50 px-2 py-2">
					<Button
						variant="outline"
						onClick={() => setIsOpen(false)}
						className="flex h-fit gap-2 px-3 py-2"
					>
						Cancel
					</Button>
					<Button
						onClick={() => setIsOpen(false)}
						className="flex h-fit gap-2 px-3 py-2"
					>
						Apply Filters
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

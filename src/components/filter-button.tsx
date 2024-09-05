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
import useQueryParams from "@/lib/useQueryParams";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterOptions {
	status: string[];
	jobType: string[];
}

interface FilterValues {
	status: Record<string, boolean>;
	jobType: Record<string, boolean>;
}

const filterOptions: FilterOptions = {
	status: ["Saved", "Applied", "Interview", "Offered"],
	jobType: ["Onsite", "Remote", "Hybrid"],
};

const createFilterValues = (options: string[], selectedOptions: string[]) =>
	Object.fromEntries(
		options.map((option) => [
			option,
			selectedOptions.includes(option.toLowerCase()),
		]),
	);

export function FilterButton() {
	const { query, setMultipleQueries, clearAllQueries } = useQueryParams({
		status: "",
		jobType: "",
	});

	const [filterValues, setFilterValues] = useState<FilterValues>({
		status: createFilterValues(
			filterOptions.status,
			query.status?.split("+") || [],
		),
		jobType: createFilterValues(
			filterOptions.jobType,
			query.jobType?.split("+") || [],
		),
	});

	useEffect(() => {
		setFilterValues({
			status: createFilterValues(
				filterOptions.status,
				query.status?.split("+") || [],
			),
			jobType: createFilterValues(
				filterOptions.jobType,
				query.jobType?.split("+") || [],
			),
		});
	}, [query]);

	const handleFilterChange = (
		category: keyof FilterValues,
		option: string,
		checked: boolean,
	) => {
		setFilterValues((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[option]: checked,
			},
		}));
	};

	const applyFilters = () => {
		setMultipleQueries({
			status: Object.keys(filterValues.status)
				.filter((key) => filterValues.status[key])
				.map((key) => key.toLowerCase())
				.join("+"),
			jobType: Object.keys(filterValues.jobType)
				.filter((key) => filterValues.jobType[key])
				.map((key) => key.toLowerCase())
				.join("+"),
		});
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="flex h-fit gap-2 px-3 py-2"
				>
					Filters
					<ChevronDown className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="mr-6 p-1" align="start">
				<div className="grid grid-cols-2 gap-3 px-4 py-2">
					{Object.entries(filterOptions).map(
						([category, options]: [string, string[]]) => (
							<div key={category} className="space-y-2">
								<Label
									htmlFor={category}
									className="text-sm font-semibold capitalize"
								>
									{category}
								</Label>
								<div className="space-y-2">
									{options.map((option: string) => (
										<div
											key={option}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={option}
												checked={
													filterValues[
														category as keyof FilterValues
													][option] || false
												}
												onCheckedChange={(
													checked: boolean,
												) =>
													handleFilterChange(
														category as keyof FilterValues,
														option,
														checked,
													)
												}
											/>
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
						onClick={clearAllQueries}
						className="flex h-fit gap-2 px-3 py-2"
					>
						Clear all
					</Button>
					<Button
						onClick={applyFilters}
						className="flex h-fit gap-2 px-3 py-2"
					>
						Apply Filters
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

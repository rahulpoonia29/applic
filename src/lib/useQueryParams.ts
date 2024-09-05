import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QueryParams = {
	[key: string]: string | undefined;
};

export default function useQueryParams(initialParams: QueryParams) {
	const router = useRouter();
	const [params, setParams] = useState<QueryParams>(initialParams);

	// Initialize params from the URL
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const newParams: QueryParams = {};
		urlParams.forEach((value, key) => {
			newParams[key] = value;
		});
		setParams((prev) => ({ ...prev, ...newParams }));
	}, []);

	// Update a single query parameter
	const setQuery = (key: string, value: string) => {
		setParams((prev) => {
			const updatedParams = { ...prev, [key]: value };
			if (!value || value === "") {
				delete updatedParams[key];
			}
			const urlParams = new URLSearchParams(
				updatedParams as Record<string, string>,
			);
			router.push(`?${urlParams.toString()}`);
			return updatedParams;
		});
	};

	// Update multiple query parameters
	const setMultipleQueries = (newParams: QueryParams) => {
		setParams((prev) => {
			const updatedParams = { ...prev, ...newParams };
			const urlParams = new URLSearchParams(
				updatedParams as Record<string, string>,
			);
			router.push(`?${urlParams.toString()}`);
			return updatedParams;
		});
	};

	// Clear a single query parameter
	const clearQuery = (key: string) => {
		setParams((prev) => {
			const updatedParams = { ...prev };
			delete updatedParams[key];
			const urlParams = new URLSearchParams(
				updatedParams as Record<string, string>,
			);
			router.push(`?${urlParams.toString()}`);
			return updatedParams;
		});
	};

	// Clear all query parameters
	const clearAllQueries = () => {
		setParams({});
		router.push("?");
	};

	return {
		query: params,
		setQuery,
		setMultipleQueries,
		clearQuery,
		clearAllQueries,
	};
}

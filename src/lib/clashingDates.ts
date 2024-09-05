export default function clashingDates(
	dates: Date[],
): { date: Date; dates: Date[] }[] {
	// Create a map to group dates by the same day
	const dateMap = new Map<string, Date[]>();

	// Iterate over the dates array
	dates.forEach((date) => {
		// Convert date to a string representation of the day
		const dayKey = date.toISOString().split("T")[0];

		// If the dayKey already exists in the map, push the date into the array
		if (dateMap.has(dayKey)) {
			dateMap.get(dayKey)!.push(date);
		} else {
			// Otherwise, create a new entry in the map
			dateMap.set(dayKey, [date]);
		}
	});

	// Filter out the entries where there is only one date for the day
	const duplicateDates = Array.from(dateMap.entries())
		.filter(([_, dateArray]) => dateArray.length > 1)
		.map(([dayKey, dateArray]) => ({
			date: new Date(dayKey),
			dates: dateArray,
		}));

	return duplicateDates;
}

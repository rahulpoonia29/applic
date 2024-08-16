import { formatDistanceToNow, isPast } from "date-fns";

export default function daysToInterview(date: Date): string {
	if (isPast(date)) {
		return "Interview done";
	}
	return formatDistanceToNow(date, { addSuffix: true });
}

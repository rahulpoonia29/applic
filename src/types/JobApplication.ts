export type JobApplication = {
	id: string;
	posting_link: string;
	role: string;
	company: string;
	salary: number;
	type: "onsite" | "remote" | "hybrid";
	location: string;
	country: string;
	status:
		| "bookmarked"
		| "applied"
		| "interview"
		| "offer"
		| "rejected"
		| "archived";
};

import axios from "axios";
import { create } from "zustand";

export type JobApplication = {
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

type useApplicationProps = {
	application: JobApplication[];
	archivedApplications: JobApplication[];
	archivedCount: number;
	loading: boolean;
	fetchApplications: () => void;
	addApplication: (application: JobApplication) => void;
};

export const useApplication = create<useApplicationProps>((set) => ({
	application: [],
	archivedApplications: [],
	archivedCount: 0,
	loading: false,
	fetchApplications: async () => {
		set({ loading: true });
		const response = await axios.get<JobApplication[]>("/api/applications");
		set({
			application: response.data.filter(
				(app: JobApplication) => app.status !== "archived"
			),
			archivedApplications: response.data.filter(
				(app: JobApplication) => app.status === "archived"
			),
			archivedCount: response.data.filter(
				(app: JobApplication) => app.status === "archived"
			).length,
		});
		set({ loading: false });
	},
	addApplication: async (application: JobApplication) => {
		await axios.post("/api/applications", application);
		set((state) => ({
			application: [...state.application, application],
		}));
	},
}));
